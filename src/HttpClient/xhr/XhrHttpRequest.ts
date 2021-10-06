import { IHttpRequest, IHttpFilter, IHttpRequestHeaderCollection, IHttpResponse, IHttpRequestContent } from '../interfaces/HttpClientInterfaces';
import { HttpMethod, KnownHeaderNames } from '../interfaces/HttpClientEnums';
import InvalidOperationException from "../InvalidOperationException";
import EmptyRequestContent from "../EmptyRequestContent";
import XhrErrorHttpResponse from './XhrErrorHttpResponse';
import XhrHttpResponse from './XhrHttpResponse';
import stringOrUrlToUrl from '../../Url/stringOrUrlToUrl';
import applyFiltersToRequestAsync from '../helpers/applyFiltersToRequestAsync';


export default class XhrHttpRequest implements IHttpRequest
{
    private readonly _filters: IHttpFilter[];
    private readonly _timeout: number;

    // these bools are provided so that the request cant be executed multiple times.
    /** true when the request is cancelled */
    private _cancelled: boolean;
    /** true when the request is preparing */
    private _prepared: boolean;
    /** true when the request has executed */
    private _executed: boolean;

    public readonly headers: IHttpRequestHeaderCollection;
    public readonly method: HttpMethod;
    public readonly uri: Url;
    public readonly xhr: XMLHttpRequest;

    public content: IHttpRequestContent;

    constructor(
        method: HttpMethod,
        uri: StringOrUrl,
        filters: IHttpFilter[] = [],
        headers: IHttpRequestHeaderCollection,
        ignoreCache: boolean,
        timeout: number
    )
    {
        this.method = method;
        this.uri = stringOrUrlToUrl(uri);
        this._filters = filters;
        this.headers = headers;
        this._timeout = timeout;

        this.xhr = new XMLHttpRequest();
        this._cancelled = false;
        this._prepared = false;
        this._executed = false;

        this.content = new EmptyRequestContent();

        if (ignoreCache)
        {
            this.headers.add(KnownHeaderNames.cacheControl, 'no-cache');
        }
    }

    /** returns true if the request was cancelled */
    public get cancelled(): boolean
    {
        return this._cancelled;
    }

    public abort(): void
    {
        this.xhr.abort();
        this._cancelled = true;
    }

    public executeAsync(): Promise<IHttpResponse | undefined>
    {
        if (this._executed)
        {
            throw new InvalidOperationException('Request already executed. Create a new Request');
        }
        this._executed = true;
        if (this._cancelled)
        {
            throw new InvalidOperationException('Request already cancelled. Create a new Request');
        }
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                // prepare the request
                await this._prepareRequestAsync();

                //
                // add the events to handle all the issues/successes
                //
                this.xhr.onload = async (evt) =>
                {
                    try
                    {
                        const response = this._prepareResponse();
                        await response.executeAsync(this);
                        resolve(response);
                    }
                    catch (e)
                    {
                        reject(e);
                    }
                };

                this.xhr.onerror = async (evt) =>
                {
                    try
                    {
                        const response = this._prepareErrorResponse();
                        await response.executeAsync(this);
                        resolve(response);
                    }
                    catch (e)
                    {
                        reject(e);
                    }
                };

                this.xhr.ontimeout = async (evt) =>
                {
                    try
                    {
                        const response = this._prepareTimeoutResponse();
                        await response.executeAsync(this);
                        resolve(response);
                    }
                    catch (e)
                    {
                        reject(e);
                    }
                };

                this.xhr.onabort = async (evt) =>
                {
                    try
                    {
                        const response = this._prepareCancelledResponse();
                        await response.executeAsync(this, true);
                        resolve(response);
                    }
                    catch (e)
                    {
                        reject(e);
                    }
                };

                let sent = false;

                //send the content
                await this.content.executeAsync(async (data) =>
                {
                    if (sent)
                    {
                        throw new InvalidOperationException("can only call the content writer once");
                    }
                    sent = true;
                    if (!this._cancelled)
                    {
                        this.xhr.send(data);
                    }

                    else
                    {
                        try
                        {
                            const response = this._prepareCancelledResponse();
                            await response.executeAsync(this, true);
                            resolve(response);
                        }
                        catch (e)
                        {
                            reject(e);
                        }
                    }
                });
            }
            catch (ex)
            {
                reject(ex);
            }
        });
    }

    private async _prepareRequestAsync(): Promise<void>
    {
        if (this._prepared)
        {
            throw new InvalidOperationException('Request already prepared. Create a new Request');
        }
        this._prepared = true;

        this.xhr.open(this.method, this.uri.toString());

        if (!this.content)
        {
            this.content = new EmptyRequestContent();
        }

        this._cancelled = await applyFiltersToRequestAsync(this, this._filters);

        // if we cancelled the request then lets bail out here
        if (!this._cancelled)
        {
            // start applying parameters to xhr now
            this._setHeaders();

            this.xhr.timeout = this._timeout;
        }
    }



    private _setHeaders(): void
    {
        // content can override the request headers
        const headers = Object.assign(
            {},
            this.headers.toObject(),
            this.content.headers.toObject());


        const names = Object.getOwnPropertyNames(headers);

        for (const name of names)
        {
            const headerValue = headers[name];
            if (headerValue != undefined)
            {
                if (Array.isArray(headerValue))
                {
                    for (const value in headerValue)
                    {
                        this.xhr.setRequestHeader(name, value);
                    }
                }

                else
                {
                    this.xhr.setRequestHeader(name, headerValue.toString());
                }
            }
        }
    }

    private _prepareResponse(): XhrHttpResponse
    {
        return new XhrHttpResponse(this._filters);
    }

    private _prepareErrorResponse(): XhrHttpResponse
    {
        return new XhrErrorHttpResponse('There was a problem with the request', this._filters);
    }

    private _prepareCancelledResponse(): XhrHttpResponse
    {
        return new XhrErrorHttpResponse('The request was cancelled', this._filters);
    }

    private _prepareTimeoutResponse(): XhrHttpResponse
    {
        return new XhrErrorHttpResponse(`The request timed out after ${this._timeout} seconds`, this._filters);
    }
}

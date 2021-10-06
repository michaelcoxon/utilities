import { IHttpRequest, IHttpFilter, IHttpResponse, IHttpResponseHeaderCollection, IHttpResponseContent } from '../interfaces/HttpClientInterfaces';
import { HttpStatusCode, HttpResponseType } from '../interfaces/HttpClientEnums';
import HttpResponseHeaderCollection from '../HttpResponseHeaderCollection';
import InvalidOperationException from "../InvalidOperationException";
import ResponseContentHandlerCollection from "../ResponseContentHandlerCollection";
import { MUST_EXECUTE_RESPONSE_FIRST_MESSAGE } from './XhrHttpRequestResponse';
import XhrHttpRequest from "./XhrHttpRequest";
import Lazy from '../../Lazy';




export default class XhrHttpResponse implements IHttpResponse
{
    private readonly _filters: IHttpFilter[];

    private _cancelled: boolean;
    private _request?: XhrHttpRequest;

    private _lazyOk: Lazy<boolean>;
    private _lazyStatus: Lazy<HttpStatusCode>;
    private _lazyStatusText: Lazy<string>;
    private _lazyHeaders: Lazy<IHttpResponseHeaderCollection>;
    private _lazyContentAsync: LazyAsync<IHttpResponseContent>;
    private _lazyresponse: Lazy<any>;
    private _lazyresponseType: Lazy<HttpResponseType>;

    constructor(filters: IHttpFilter[] = [])
    {
        this._filters = filters;
        this._cancelled = false;

        const lazyException = new Lazy(() => { throw new InvalidOperationException(MUST_EXECUTE_RESPONSE_FIRST_MESSAGE); });

        this._lazyOk = lazyException;
        this._lazyStatus = lazyException;
        this._lazyStatusText = lazyException;
        this._lazyHeaders = lazyException;
        this._lazyresponse = lazyException;
        this._lazyresponseType = lazyException;
        this._lazyContentAsync = new LazyAsync(async () => { throw new InvalidOperationException(MUST_EXECUTE_RESPONSE_FIRST_MESSAGE); });
    }

    public shouldRetry: boolean = false;


    get cancelled(): boolean
    {
        return this._cancelled;
    }

    public get request(): Readonly<IHttpRequest>
    {
        if (!this._request)
        {
            throw new InvalidOperationException(MUST_EXECUTE_RESPONSE_FIRST_MESSAGE);
        }
        return this._request;
    }

    get response(): any
    {
        return this._lazyresponse.value;
    }

    get responseType(): HttpResponseType
    {
        return this._lazyresponseType.value;
    }

    get status(): HttpStatusCode
    {
        return this._lazyStatus.value;
    }

    get statusText(): string
    {
        return this._lazyStatusText.value;
    }

    get headers(): IHttpResponseHeaderCollection
    {
        return this._lazyHeaders.value;
    }

    get contentAsync(): Promise<IHttpResponseContent>
    {
        return this._lazyContentAsync.value;
    }

    get ok(): boolean
    {
        return this._lazyOk.value;
    }

    public async executeAsync(request: IHttpRequest, cancelled: boolean = false): Promise<void>
    {
        if (!(request instanceof XhrHttpRequest))
        {
            throw new ArgumentException('request', 'request must be of type XhrHttpRequest');
        }

        this._request = request;

        this._lazyOk = new Lazy<boolean>(() => request.xhr.status >= 200 && request.xhr.status < 300);
        this._lazyStatus = new Lazy<HttpStatusCode>(() => request.xhr.status);
        this._lazyStatusText = new Lazy<string>(() => request.xhr.statusText);
        this._lazyHeaders = new Lazy<IHttpResponseHeaderCollection>(() => XhrHttpResponse._createHttpResponseHeaderCollection(request.xhr.getAllResponseHeaders()));
        this._lazyresponse = new Lazy<any>(() => request.xhr.response);
        this._lazyresponseType = new Lazy<HttpResponseType>(() => XhrHttpResponse._mapResponseType(request.xhr.responseType));
        this._lazyContentAsync = new LazyAsync<IHttpResponseContent>(async () => await ResponseContentHandlerCollection.handleAsync(this));

        this._cancelled = cancelled || await FilterHelpers.applyFiltersToResponseAsync(this, this._filters);
    }



    private static _createHttpResponseHeaderCollection(xhrHeaders: string): IHttpResponseHeaderCollection
    {
        const collection = new HttpResponseHeaderCollection();

        for (const header of HeaderHelpers.splitHeadersFromString(xhrHeaders))
        {
            collection.add(header.name, header.value);
        }

        return collection;
    }

    private static _mapResponseType(xhrResponseType: XMLHttpRequestResponseType): HttpResponseType
    {
        switch (xhrResponseType)
        {
            case "": return HttpResponseType.unknown;
            case "arraybuffer": return HttpResponseType.arrayBuffer;
            case "blob": return HttpResponseType.blob;
            case "document": return HttpResponseType.document;
            case "json": return HttpResponseType.json;
            case "text": return HttpResponseType.text;
            default:
                throw new NotSupportedException(`The response type '${xhrResponseType}' is not supported.`);
        }
    }
}

import { IHttpRequestContent, IHttpContentHeaderCollection } from './interfaces/HttpClientInterfaces';
import HttpContentHeaderCollection from './HttpContentHeaderCollection';
import { HttpContentEncoding, KnownContentTypes } from './interfaces/HttpClientEnums';


export default class JsonRequestContent<T> implements IHttpRequestContent
{
    readonly headers: IHttpContentHeaderCollection;
    readonly object: T;

    constructor(object: T, headers: IHttpContentHeaderCollection = new HttpContentHeaderCollection())
    {
        this.object = object;

        headers.contentType = {
            contentType: KnownContentTypes.json,
            encoding: HttpContentEncoding.utf8,
        };

        this.headers = headers;
    }

    public async executeAsync<TResult>(contentWriter: (data?: any) => TResult | PromiseLike<TResult>): Promise<TResult>
    {
        const json = JSON.stringify(this.object);
        return await contentWriter(json);
    }
}

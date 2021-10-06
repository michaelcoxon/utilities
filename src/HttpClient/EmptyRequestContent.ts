import { IHttpRequestContent, IHttpContentHeaderCollection } from './interfaces/HttpClientInterfaces';
import HttpContentHeaderCollection from './HttpContentHeaderCollection';
import { HttpContentEncoding, KnownContentTypes } from './interfaces/HttpClientEnums';




export default class EmptyRequestContent implements IHttpRequestContent
{
    readonly headers: IHttpContentHeaderCollection;

    constructor(headers: IHttpContentHeaderCollection = new HttpContentHeaderCollection())
    {
        if (!headers.contentType)
        {
            headers.contentType = {
                contentType: KnownContentTypes.plainText,
                encoding: HttpContentEncoding.utf8,
            };
        }

        this.headers = headers;
    }

    public async executeAsync<TResult>(contentWriter: (data?: any) => TResult | PromiseLike<TResult>): Promise<TResult>
    {
        return await contentWriter();
    }
}

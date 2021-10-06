import { IHttpRequestContent, IHttpContentHeaderCollection } from './interfaces/HttpClientInterfaces';
import HttpContentHeaderCollection from './HttpContentHeaderCollection';
import { HttpContentEncoding, KnownContentTypes } from './interfaces/HttpClientEnums';


export default class StringRequestContent implements IHttpRequestContent
{
    readonly headers: IHttpContentHeaderCollection;
    readonly str: string;

    constructor(str: string, headers: IHttpContentHeaderCollection = new HttpContentHeaderCollection())
    {
        this.str = str;

        headers.contentType = {
            contentType: KnownContentTypes.plainText,
            encoding: HttpContentEncoding.utf8,
        };

        this.headers = headers;
    }

    public async executeAsync<TResult>(contentWriter: (data?: any) => TResult | PromiseLike<TResult>): Promise<TResult>
    {
        return await contentWriter(this.str);
    }
}

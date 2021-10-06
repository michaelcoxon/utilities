import { IHttpResponseHeaderCollection,  HttpHeaderValue, IContentType } from './interfaces/HttpClientInterfaces';
import { KnownHeaderNames } from './interfaces/HttpClientEnums';
import HeaderCollection from './HeaderCollection';
import contentTypeToString from './helpers/contentTypeToString';
import stringToContentType from './helpers/stringToContentType';


export default class HttpResponseHeaderCollection extends HeaderCollection implements IHttpResponseHeaderCollection
{
    public get contentType(): IContentType | undefined
    {
        const header = this.get(KnownHeaderNames.contentType);
        if (header)
        {
            return stringToContentType(header.value as string);
        }
    }

    public set contentType(value: IContentType | undefined)
    {
        const header = this.get(KnownHeaderNames.contentType);
        if (header)
        {
            this.update(KnownHeaderNames.contentType, contentTypeToString(value));
        }
        else
        {
            this.add(KnownHeaderNames.contentType, contentTypeToString(value));
        }
    }

    public static createFromObject(headers: { [name: string]: HttpHeaderValue }): IHttpResponseHeaderCollection
    {
        const result = new HttpResponseHeaderCollection();

        for (const name in headers)
        {
            result.add(name, headers[name]);
        }

        return result;
    }
}
import { IHttpResponseContentHandler, IHttpResponse, IHttpResponseContent } from './interfaces/HttpClientInterfaces';
import { HttpResponseType, KnownHeaderNames } from './interfaces/HttpClientEnums';




export default class NoContentResponseContentHandler implements IHttpResponseContentHandler
{
    public async canHandleAsync(response: IHttpResponse): Promise<boolean>
    {
        const contentLength = response.headers.get(KnownHeaderNames.contentLength);

        if (contentLength !== undefined)
        {
            return contentLength.value == 0;
        }
        else if (response.responseType == HttpResponseType.unknown)
        {
            return (response.response as string).length == 0;
        }
        else if (ArrayBuffer !== undefined && response.response instanceof ArrayBuffer)
        {
            return response.response.byteLength == 0;
        }
        else if (Blob !== undefined && response.response instanceof Blob)
        {
            response.response.size == 0;
        }
        else if (Document !== undefined && response.response instanceof Document)
        {
            if (response.response.documentElement === null || response.response.documentElement === undefined)
            {
                return true;
            }

            else
            {
                return response.response.documentElement.outerHTML.length == 0;
            }
        }
        else if (typeof (response.response) === "string")
        {
            return response.response.length == 0;
        }

        // after this we are unsure so just return false
        return false;
    }

    public async handleAsync(response: IHttpResponse): Promise<IHttpResponseContent>
    {
        return {};
    }
}

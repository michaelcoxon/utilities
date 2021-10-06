import { IHttpResponseContentHandler, IHttpResponse, IHttpResponseContent } from './interfaces/HttpClientInterfaces';
import JsonResponseContent from "./JsonResponseContent";
import { HttpResponseType, KnownContentTypes } from './interfaces/HttpClientEnums';




export default class JsonResponseContentHandler implements IHttpResponseContentHandler
{
    public async canHandleAsync(response: IHttpResponse): Promise<boolean>
    {
        // if the responseTyoe is set we can be pretty sure this is ok
        if (response.responseType == HttpResponseType.json)
        {
            return true;
        }

        // otherwise lets parse the content type
        else if (response.headers.contentType)
        {
            switch (response.headers.contentType.contentType)
            {
                case KnownContentTypes.json:
                    return true;
            }
        }
        // other than the above, this is not looking good
        return false;
    }

    public async handleAsync(response: IHttpResponse): Promise<IHttpResponseContent>
    {
        return new JsonResponseContent(response.response);
    }
}

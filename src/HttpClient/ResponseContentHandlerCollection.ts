import ArgumentException from '../Exceptions/ArgumentException';
import { IHttpResponseContentHandler, IHttpResponse, IHttpResponseContent } from './interfaces/HttpClientInterfaces';




export default class ResponseContentHandlerCollection
{
    private static _handlers: IHttpResponseContentHandler[];

    public static setHandlers(handlers: IHttpResponseContentHandler[])
    {
        ResponseContentHandlerCollection._handlers = handlers;
    }

    public static async handleAsync(response: IHttpResponse): Promise<IHttpResponseContent>
    {
        for (const handler of ResponseContentHandlerCollection._handlers)
        {
            if (await handler.canHandleAsync(response))
            {
                return await handler.handleAsync(response);
            }
        }
        throw new ArgumentException('response', 'No registered handlers can handle the response.');
    }
}

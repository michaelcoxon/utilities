import { IHttpResponseContentHandler } from './interfaces/HttpClientInterfaces';
import ResponseContentHandlerCollection from './ResponseContentHandlerCollection';
import JsonResponseContentHandler from './JsonResponseContentHandler';
import PlainTextResponseContentHandler from './PlainTextResponseContentHandler';



// -- must be last
const defaultHandlers: IHttpResponseContentHandler[] =
    [
        // new NoContentResponseContentHandler(),
        new JsonResponseContentHandler(),
        new PlainTextResponseContentHandler(),
    ];

ResponseContentHandlerCollection.setHandlers(defaultHandlers);

import Exception from '../Exceptions/Exception';
import { IHttpRequest } from './interfaces/HttpClientInterfaces';


export default class RequestCancelledException extends Exception
{
    readonly request: Readonly<IHttpRequest>;

    constructor(request: IHttpRequest);
    constructor(request: IHttpRequest, message: string);
    constructor(request: IHttpRequest, mmessage: string, innerException: Exception);
    constructor(request: IHttpRequest, message?: string, innerException?: Exception)
    {
        super(message!, innerException!);
        this.name = 'RequestCancelledException';

        this.request = request;
    }
}

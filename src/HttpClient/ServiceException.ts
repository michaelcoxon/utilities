import Exception from '../Exceptions/Exception';
import { IHttpResponse } from './interfaces/HttpClientInterfaces';


export default class ServiceException extends Exception
{
    readonly response: Readonly<IHttpResponse>;

    constructor(response: IHttpResponse);
    constructor(response: IHttpResponse, message: string);
    constructor(response: IHttpResponse, mmessage: string, innerException: Exception);
    constructor(response: IHttpResponse, message?: string, innerException?: Exception)
    {
        super(message!, innerException!);
        this.name = 'ServiceException';

        this.response = response;
    }
}

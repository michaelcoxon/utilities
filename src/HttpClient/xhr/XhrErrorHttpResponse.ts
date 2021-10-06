import { IHttpFilter, IErrorHttpResponse } from '../interfaces/HttpClientInterfaces';
import XhrHttpResponse from "./XhrHttpResponse";



export default class XhrErrorHttpResponse extends XhrHttpResponse implements IErrorHttpResponse
{
    public readonly message: string;

    constructor(message: string, filters: IHttpFilter[])
    {
        super(filters);
        this.message = message;
    }
}

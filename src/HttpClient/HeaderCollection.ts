﻿import ArgumentException from '../Exceptions/ArgumentException';
import KeyAlreadyDefinedException from '../Exceptions/KeyAlreadyDefinedException';
import { IHttpHeader, HttpHeaderValue, IHttpHeaderCollection } from './interfaces/HttpClientInterfaces';




export default class HeaderCollection implements IHttpHeaderCollection
{
    private readonly _headers: IHttpHeader[];

    constructor(...headers: IHttpHeader[])
    {
        this._headers = [...headers];
    }

    add(name: string, value: HttpHeaderValue): void
    {
        this.addHeader({ name: name, value: value });
    }

    addHeader(header: IHttpHeader): void
    {
        const existingHeader = this.get(header.name);
        if (existingHeader)
        {
            const innerException = new KeyAlreadyDefinedException(existingHeader.name);
            throw new ArgumentException('name', innerException.message, innerException);
        }
        else
        {
            this._headers.push(header);
        }
    }

    get(name: string): IHttpHeader | undefined
    {
        return this._headers.find(i => i.name.toLowerCase() === name.toLowerCase());
    }

    getAll(): IHttpHeader[]
    {
        // we make a copy of the internal array so it cannot be modified.
        // the individual headers in the array are returned by reference however.
        return [...this._headers];
    }

    remove(name: string): boolean
    {
        const header = this.get(name);
        if (header)
        {
            const index = this._headers.indexOf(header);
            this._headers.splice(index, 1);
            return true;
        }
        return false;
    }

    update(name: string, value: HttpHeaderValue): void
    {
        const header = this.get(name);
        if (header)
        {
            if (value)
            {
                header.value = value;
            }
            else
            {
                this.remove(name);
            }
        }
        else
        {
            this.add(name, value);
        }
    }

    toObject(): { [name: string]: HttpHeaderValue }
    {
        const result: { [name: string]: HttpHeaderValue; } = {};

        for (const header of this._headers)
        {
            result[header.name] = header.value;
        }

        return result;
    }

    public static createFromObject(headers: { [name: string]: HttpHeaderValue }): IHttpHeaderCollection
    {
        const result = new HeaderCollection();

        for (const name in headers)
        {
            result.add(name, headers[name]);
        }

        return result;
    }
}
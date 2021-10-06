import { IHttpResponseContent } from './interfaces/HttpClientInterfaces';




export default class PlainTextResponseContent implements IHttpResponseContent
{
    private readonly _text: string;

    constructor(text: string)
    {
        this._text = text;
    }

    public get content(): string
    {
        return this._text;
    }
}

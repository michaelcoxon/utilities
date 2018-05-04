import { Undefinable } from "./Types";



export interface IResult<T={}>
{
    readonly value?: T;
    readonly success: boolean;
    readonly error?: string;
}

export class Result<T={}> implements IResult<T>
{
    private readonly _value?: T;
    private readonly _success: boolean;
    private readonly _error?: string;

    constructor(success: boolean, value?: T, error?: string)
    {
        this._success = success;
        this._value = value;
        this._error = error;
    }

    public get value(): Undefinable<T>
    {
        return this._value;
    }

    public get success(): boolean
    {
        return this._success;
    }

    public get error(): Undefinable<string>
    {
        return this._error;
    }

    public static ok<T>(value?: T)
    {
        return new Result<T>(true, value);
    }

    public static fail(error?: string)
    {
        return new Result(false, undefined, error);
    }
}
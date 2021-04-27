import { Undefinable } from "./Types";

/**  */
export interface IResultBase<TPreviousResult extends IResultBase = never>
{
    readonly success: boolean;
    readonly error?: string;
    readonly previousResult?: TPreviousResult;
}


export interface IResult<T, TPreviousResult extends IResultBase = never> extends IResultBase<TPreviousResult>
{
    readonly value?: T;
    readonly success: boolean;
    readonly error?: string;
    readonly previousResult?: TPreviousResult;
}

export default class Result<T = {}, TPreviousResult extends IResultBase = never> implements IResult<T, TPreviousResult>
{
    private readonly _value?: T;
    private readonly _success: boolean;
    private readonly _error?: string;
    private readonly _previousResult?: TPreviousResult;

    constructor(success: boolean, value?: T, error?: string, previousResult?: TPreviousResult)
    {
        this._success = success;
        this._value = value;
        this._error = error;
        this._previousResult = previousResult;
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

    public get previousResult(): Undefinable<TPreviousResult>
    {
        return this._previousResult;
    }

    public static ok<T, TPreviousResult extends IResultBase = never>(value?: T, previousResult?: TPreviousResult): IResult<T, TPreviousResult>
    {
        return new Result(true, value, undefined, previousResult);
    }

    public static fail<T, TPreviousResult extends IResultBase = never>(error?: string, value?: T, previousResult?: TPreviousResult): IResult<T, TPreviousResult>
    {
        return new Result(false, value, error, previousResult);
    }
}
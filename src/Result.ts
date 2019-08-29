import { Undefinable } from "./Types";

export interface IResultBase<TPreviousResult extends IResultBase | undefined = undefined>
{
    readonly success: boolean;
    readonly error?: string;
    readonly previousResult?: TPreviousResult;
}


export interface IResult<T, TPreviousResult extends IResultBase | undefined = undefined> extends IResultBase<TPreviousResult>
{
    readonly value?: T;
    readonly success: boolean;
    readonly error?: string;
    readonly previousResult: TPreviousResult;
}

export class Result<T={}, TPreviousResult extends IResultBase | undefined = undefined> implements IResult<T, TPreviousResult>
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

    public get previousResult(): TPreviousResult
    {
        return this.previousResult;
    }

    public static ok<T, TPreviousResult extends IResultBase | undefined = undefined>(value?: T, previousResult?: TPreviousResult): IResult<T, TPreviousResult>
    {
        return new Result(true, value, undefined, previousResult);
    }

    public static fail<T, TPreviousResult extends IResultBase | undefined = undefined>(error?: string, previousResult?: TPreviousResult): IResult<T, TPreviousResult>
    {
        return new Result(false, undefined, error, previousResult);
    }
}
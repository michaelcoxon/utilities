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

export default class Result<T = Record<string, unknown>, TPreviousResult extends IResultBase = never> implements IResult<T, TPreviousResult>
{
    readonly #value?: T;
    readonly #success: boolean;
    readonly #error?: string;
    readonly #previousResult?: TPreviousResult;

    constructor(success: boolean, value?: T, error?: string, previousResult?: TPreviousResult)
    {
        this.#success = success;
        this.#value = value;
        this.#error = error;
        this.#previousResult = previousResult;
    }

    public get value(): Undefinable<T>
    {
        return this.#value;
    }

    public get success(): boolean
    {
        return this.#success;
    }

    public get error(): Undefinable<string>
    {
        return this.#error;
    }

    public get previousResult(): Undefinable<TPreviousResult>
    {
        return this.#previousResult;
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
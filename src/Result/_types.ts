
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
import ArgumentException from '../Exceptions/ArgumentException';
import ArgumentNullException from '../Exceptions/ArgumentNullException';
import ArgumentUndefinedException from '../Exceptions/ArgumentUndefinedException';
import Exception from '../Exceptions/Exception';
import { ConstructorFor, Func1 } from '../Types';

export type AssertionType<T> = T | undefined | null

export interface IArgumentAssertionBuilder<T>
{
    readonly argument: T;
    readonly argumentName: string;
}

export class ArgumentAssertionBuilder<T> implements IArgumentAssertionBuilder<T>
{
    constructor(readonly argument: T, readonly argumentName: string) { }

    /** Ensures the argument is not null or undefined */
    isNotNullOrUndefined<T>(): this
    {
        return this.isNotNull().isNotUndefined();
    }

    /** Ensures the argument is not null */
    isNotNull(): this
    {
        if (this.argument == null)
        {
            throw new ArgumentNullException(this.argumentName);
        }
        return this;
    }

    /** Ensures the argument is not undefined */
    isNotUndefined(): this
    {
        if (this.argument === undefined)
        {
            throw new ArgumentUndefinedException(this.argumentName);
        }
        return this;
    }

    /**
     * Ensures the argument is of the type
     * @param type The type
     */
    isTypeOf<T2>(type: ConstructorFor<T2>): this
    {
        if (!(this.argument instanceof type))
        {
            throw new ArgumentException(this.argumentName, `The argument at '${this.argumentName}' must be of type '${type}'`);
        }
        return this;
    }

    /**
     * Asserts on the value of predicate to whether the assertion is valid.
     * @param predicate The predicate to test to see if the assertion is valid.
     * @param message The message to use if the assertion is invalid.
     */
    matches(predicate: Func1<T, boolean>, message?: string): this
    {
        let result: boolean;
        let innerException: Exception;
        try
        {
            result = predicate(this.argument);
        }
        catch (ex)
        {
            innerException = ex as Exception;
            result = false;
        }
        if (!result)
        {
            throw new ArgumentException(this.argumentName, message!, innerException!);
        }

        return this;
    }

    /**
     * Determines whether the argument is one of the specified options.
     * @param options
     */
    isOneOf(...options: T[]): this
    {
        if (options.indexOf(this.argument) == -1)
        {
            throw new ArgumentException(this.argumentName, `Argument '${this.argumentName}' must be one of ('${options.join("', '")}')`);
        }
        return this;
    }
}
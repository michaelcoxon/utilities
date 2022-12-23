import ArgumentException from '../Exceptions/ArgumentException';
import ArgumentNullException from '../Exceptions/ArgumentNullException';
import ArgumentUndefinedException from '../Exceptions/ArgumentUndefinedException';
import Exception from '../Exceptions/Exception';
import { ConstructorFor, Func1, Undefinable } from '../Types';
import SR from '../i18n/en/assertions.strings.json';
import { format } from '../Strings';

/**
 * supported types
 */
 export type AssertionType<T> = T | undefined | null;

/**
 * Interface for implementing your own builder
 */
export interface IArgumentAssertionBuilder<T>
{
    readonly argument: T;
    readonly argumentName: string;
}

export default class ArgumentAssertionBuilder<T> implements IArgumentAssertionBuilder<T>
{
    constructor(readonly argument: T, readonly argumentName: string) { }

    /** Ensures the argument is not null or undefined */
    isNotNullOrUndefined(): this
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
            throw new ArgumentException(this.argumentName, format(SR.isTypeOfExceptionMessage, this.argumentName, type));
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
        let innerException: Undefinable<Exception>;
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
            throw new ArgumentException(this.argumentName, message, innerException);
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
            throw new ArgumentException(this.argumentName, format(SR.isOneOfExceptionMessage, this.argumentName, options.join("', '")));
        }
        return this;
    }
}
import * as SR from './i18n/en.exceptions.strings.json';
import { Strings } from './Strings';

/**
 * Represents errors that occur during application execution.
 */
export class Exception extends Error
{
    private readonly _innerException?: Exception;

    __proto__: Error;

    /**
     * Creates a new Exception
     */
    constructor();
    /**
     * Creates a new Exception with a message
     * @param message the message
     */
    constructor(message: string);
    /**
     * Creates a new Exception with a message and an inner exception
     * @param message the message
     * @param innerException this is used to capture any exceptions that were
     *                       called before this exception.
     */
    constructor(message: string, innerException: Exception);
    constructor(message?: string, innerException?: Exception)
    {
        const trueProto = new.target.prototype;
        super(message);

        // Alternatively use Object.setPrototypeOf if you have an ES6 environment.
        this.__proto__ = trueProto;

        this._innerException = innerException;
    }

    /** Gets the Exception instance that caused the current exception. */
    public get innerException(): Exception | undefined
    {
        return this._innerException;
    }

    public static isException(error: Error): error is Exception
    {
        return (<any>error)['innerException'] !== undefined
    }
}

export class ErrorException extends Exception
{
    constructor(error: Error)
    {
        super();
        this.name = error.name;
        this.message = error.message;
        this.stack = error.stack;
    }
}

/**
 * The exception that is thrown when one of the arguments provided to a method is not valid.
 */
export class ArgumentException extends Exception
{
    /**
     * Creates a new Argument Exception
     * @param argumentName the name of the argument that is invalid
     */
    constructor(argumentName: string);
    /**
     * Creates a new Argument Exception
     * @param argumentName the name of the argument that is invalid
     * @param message the message
     */
    constructor(argumentName: string, message: string);
    /**
     * Creates a new Argument Exception
     * @param argumentName the name of the argument that is invalid
     * @param message the message
     * @param innerException this is used to capture any exceptions that were
     *                       called before this exception.
     */
    constructor(argumentName: string, message: string, innerException: Exception);
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
        const _message = `'${argumentName}' ${message}`;
        if (innerException)
        {
            super(_message, innerException);
        }
        else
        {
            super(_message);
        }
        this.name = 'ArgumentException';
    }
}


export class ArgumentUndefinedException extends ArgumentException
{
    constructor(argumentName: string, innerException?: Exception)
    {
        const _message = Strings.format(SR.ArgumentUndefinedException_message, argumentName);
        if (innerException)
        {
            super(argumentName, _message, innerException);
        }
        else
        {
            super(argumentName, _message);
        }

        this.name = 'ArgumentUndefinedException';
    }
}

export class ArgumentNullException extends ArgumentException
{
    constructor(argumentName: string, innerException?: Exception)
    {
        const _message = Strings.format(SR.ArgumentNullException_message, argumentName);
        if (innerException)
        {
            super(argumentName, _message, innerException);
        }
        else
        {
            super(argumentName, _message);
        }

        this.name = 'ArgumentNullException';
    }
}

export class InvalidTypeException extends Exception
{
    constructor(variableName: string, expectedTypeName: string, message?: string, innerException?: Exception)
    {
        const _message = Strings.format(SR.InvalidTypeException_message, variableName, expectedTypeName, message !== undefined ? message : Strings.empty);
        if (innerException)
        {
            super(_message, innerException);
        }
        else
        {
            super(_message);
        }

        this.name = 'InvalidTypeException';
    }
}

export class NotImplementedException extends Exception
{
    constructor(message?: string, innerException?: Exception)
    {
        if (innerException)
        {
            super(message!, innerException);
        }
        else
        {
            if (message)
            {
                super(message);
            } else
            {
                super();
            }
        }
        this.name = 'NotImplementedException';
    }
}

export class NotSupportedException extends Exception
{
    constructor(message?: string, innerException?: Exception)
    {
        if (innerException)
        {
            super(message!, innerException);
        }
        else
        {
            if (message)
            {
                super(message);
            } else
            {
                super();
            }
        }
        this.name = 'NotSupportedException';
    }
}

export class OutOfBoundsException extends Exception
{
    constructor(variableName: string, minBound: number, maxBound: number, innerException?: Exception)
    {
        const _message = Strings.format(SR.OutOfBoundsException_message, variableName, minBound, maxBound);
        if (innerException)
        {
            super(_message, innerException);
        }
        else
        {
            super(_message);
        }
        this.name = 'OutOfBoundsException';
    }
}

export class IndexOutOfRangeException extends Exception
{
    constructor(variableName: string, index: number, minBound: number, maxBound: number, innerException?: Exception)
    {
        const _message = Strings.format(SR.IndexOutOfRangeException_message, index, variableName, minBound, maxBound);
        if (innerException)
        {
            super(_message, innerException);
        }
        else
        {
            super(_message);
        }
        this.name = 'OutOfBoundsException';
    }
}

export class FileNotFoundException extends Exception
{
    constructor(filename: string, innerException?: Exception)
    {
        const _message = Strings.format(SR.FileNotFoundException_message, filename);
        if (innerException)
        {
            super(_message, innerException);
        }
        else
        {
            super(_message);
        }
        this.name = 'FileNotFoundException';
    }
}

export class KeyNotFoundException<TKey> extends Exception
{
    constructor(key: TKey, innerException?: Exception)
    {
        const _message = Strings.format(SR.KeyNotFoundException_message, key);
        if (innerException)
        {
            super(_message, innerException);
        }
        else
        {
            super(_message);
        }
        this.name = 'KeyNotFoundException';
    }
}

export class KeyAlreadyDefinedException<TKey> extends Exception
{
    constructor(key: TKey, innerException?: Exception)
    {
        const _message = Strings.format(SR.KeyAlreadyDefinedException_message, key);
        if (innerException)
        {
            super(_message, innerException);
        }
        else
        {
            super(_message);
        }
        this.name = 'KeyAlreadyDefinedException';
    }
}

export class NullReferenceException extends Exception
{
    constructor(message?: string, innerException?: Exception)
    {
        if (innerException)
        {
            super(message!, innerException);
        }
        else
        {
            if (message)
            {
                super(message);
            } else
            {
                super();
            }
        }
        this.name = 'NullReferenceException';
    }
}

export class AlreadyDisposedException extends Exception
{
    constructor(message?: string, innerException?: Exception)
    {
        if (innerException)
        {
            super(message!, innerException);
        }
        else
        {
            if (message)
            {
                super(message);
            } else
            {
                super();
            }
        }
        this.name = 'AlreadyDisposedException';
    }
}
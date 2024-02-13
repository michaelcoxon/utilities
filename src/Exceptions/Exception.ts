/**
 * Represents errors that occur during application execution.
 */

export default class Exception extends Error
{
    readonly #innerException?: Exception;

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
    constructor(message: string | undefined, innerException: Exception);
    constructor(message?: string, innerException?: Exception)
    {
        super(message);
        const trueProto = new.target.prototype;

        // Alternatively use Object.setPrototypeOf if you have an ES6 environment.
        this.__proto__ = trueProto;

        this.#innerException = innerException;
    }

    /** Gets the Exception instance that caused the current exception. */
    public get innerException(): Exception | undefined
    {
        return this.#innerException;
    }

    public static isException(error: unknown | Error | Exception): error is Exception
    {
        if (error instanceof Exception)
        {
            return true;
        }
        else if (error instanceof Object)
        {
            return error['innerException'] !== undefined;
        }
        return false;
    }
}

/**
 * Represents errors that occur during application execution.
 */

export default class Exception extends Error
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
    constructor(message: string, innerException: Exception)
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
        return (error as any)['innerException'] !== undefined;
    }
}

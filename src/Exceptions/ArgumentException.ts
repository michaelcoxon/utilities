import Exception from './Exception';

/**
 * The exception that is thrown when one of the arguments provided to a method is not valid.
 */

export default class ArgumentException extends Exception
{
    /**
     * Creates a new Argument Exception
     * @param argumentName the name of the argument that is invalid
     * @param message the message
     * @param innerException this is used to capture any exceptions that were
     *                       called before this exception.
     */
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

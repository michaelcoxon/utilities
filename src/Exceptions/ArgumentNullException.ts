import format from '../Strings/format';
import ArgumentException from './ArgumentException';
import Exception from './Exception';
import SR from './_SR';


export default class ArgumentNullException extends ArgumentException
{
    constructor(argumentName: string, innerException?: Exception)
    {
        const _message = format(SR.ArgumentNullException_message, argumentName);
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

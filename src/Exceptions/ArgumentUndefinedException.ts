import format from '../Strings/format';
import ArgumentException from './ArgumentException';
import Exception from './Exception';
import SR from '../i18n/en/exceptions.strings';


export default class ArgumentUndefinedException extends ArgumentException
{
    constructor(argumentName: string, innerException?: Exception)
    {
        const _message = format(SR.ArgumentUndefinedException_message, argumentName);
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

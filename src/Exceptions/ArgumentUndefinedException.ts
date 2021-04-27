import Strings from '../Strings';
import ArgumentException from './ArgumentException';
import Exception from './Exception';
import  SR  from './_SR';


export default class ArgumentUndefinedException extends ArgumentException
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

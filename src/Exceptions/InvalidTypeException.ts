import Strings from '../Strings';
import  Exception  from './Exception';
import  SR from './_SR';


export default class InvalidTypeException extends Exception
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

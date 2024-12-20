import format from '../Strings/format';
import  Exception  from './Exception';
import SR from '../i18n/en/exceptions.strings';


export default class OutOfBoundsException extends Exception
{
    constructor(variableName: string, minBound: number, maxBound: number, innerException?: Exception)
    {
        const _message = format(SR.OutOfBoundsException_message, variableName, minBound, maxBound);
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

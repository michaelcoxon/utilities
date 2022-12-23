import format from '../Strings/format';
import  Exception  from './Exception';
import SR from '../i18n/en/exceptions.strings.json';


export default class IndexOutOfRangeException extends Exception
{
    constructor(variableName: string, index: number, minBound: number, maxBound: number, innerException?: Exception)
    {
        const _message = format(SR.IndexOutOfRangeException_message, index, variableName, minBound, maxBound);
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

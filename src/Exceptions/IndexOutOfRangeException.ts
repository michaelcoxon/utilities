import Strings from '../Strings';
import  Exception  from './Exception';
import  SR  from './_SR';


export default class IndexOutOfRangeException extends Exception
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

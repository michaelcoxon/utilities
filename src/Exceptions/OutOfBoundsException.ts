import Strings from '../Strings';
import  Exception  from './Exception';
import  SR  from './_SR';


export default class OutOfBoundsException extends Exception
{
    constructor(variableName: string, minBound: number, maxBound: number, innerException?: Exception)
    {
        const _message = Strings.format(SR.OutOfBoundsException_message, variableName, minBound, maxBound);
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

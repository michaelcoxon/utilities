import Strings from '../Strings';
import Exception from './Exception';
import SR from './_SR';


export default class FileNotFoundException extends Exception
{
    constructor(filename: string, innerException?: Exception)
    {
        const _message = Strings.format(SR.FileNotFoundException_message, filename);
        if (innerException)
        {
            super(_message, innerException);
        }

        else
        {
            super(_message);
        }
        this.name = 'FileNotFoundException';
    }
}
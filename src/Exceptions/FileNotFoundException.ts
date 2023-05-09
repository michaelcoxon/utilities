import format from '../Strings/format';
import Exception from './Exception';
import SR from '../i18n/en/exceptions.strings.json';


export default class FileNotFoundException extends Exception
{
    constructor(filename: string, innerException?: Exception)
    {
        const _message = format(SR.FileNotFoundException_message, filename);
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

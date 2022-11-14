import format from '../Strings/format.js';
import Exception from './Exception.js';
import SR from '../i18n/en.exceptions.strings.json';


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

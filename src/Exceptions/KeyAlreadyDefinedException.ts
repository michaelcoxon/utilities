import format from '../Strings/format';
import  Exception  from './Exception';
import SR from '../i18n/en/exceptions.strings.json';


export default class KeyAlreadyDefinedException<TKey> extends Exception
{
    constructor(key: TKey, innerException?: Exception)
    {
        const _message = format(SR.KeyAlreadyDefinedException_message, key);
        if (innerException)
        {
            super(_message, innerException);
        }

        else
        {
            super(_message);
        }
        this.name = 'KeyAlreadyDefinedException';
    }
}

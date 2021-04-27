import Strings from '../Strings';
import  Exception  from './Exception';
import  SR  from './_SR';


export default class KeyNotFoundException<TKey> extends Exception
{
    constructor(key: TKey, innerException?: Exception)
    {
        const _message = Strings.format(SR.KeyNotFoundException_message, key);
        if (innerException)
        {
            super(_message, innerException);
        }

        else
        {
            super(_message);
        }
        this.name = 'KeyNotFoundException';
    }
}

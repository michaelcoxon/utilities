import  Exception  from './Exception';
import SR from '../i18n/en/exceptions.strings.json';


export default class MutexAlreadyAquiredException extends Exception
{
    constructor(message?: string, innerException?: Exception)
    {
        if (innerException)
        {
            super(message, innerException);
        }

        else
        {
            if (message)
            {
                super(message);
            }
            else
            {
                super(SR.MutexAlreadyAquiredException_message);
            }
        }
        this.name = 'InvalidOperationException';
    }
}

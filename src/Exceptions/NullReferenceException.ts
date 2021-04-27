import  Exception  from './Exception';


export default class NullReferenceException extends Exception
{
    constructor(message?: string, innerException?: Exception)
    {
        if (innerException)
        {
            super(message!, innerException);
        }

        else
        {
            if (message)
            {
                super(message);
            }
            else
            {
                super();
            }
        }
        this.name = 'NullReferenceException';
    }
}

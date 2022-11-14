import Exception from './Exception.js';


export default class AlreadyDisposedException extends Exception
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
                super();
            }
        }
        this.name = 'AlreadyDisposedException';
    }
}

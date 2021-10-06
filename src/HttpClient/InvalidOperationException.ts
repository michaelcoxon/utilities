import Exception from '../Exceptions/Exception';


export default class InvalidOperationException extends Exception
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
        this.name = 'InvalidOperationException';
    }
}

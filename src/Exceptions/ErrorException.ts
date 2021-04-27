import Exception from './Exception';


export default class ErrorException extends Exception
{
    constructor(error: Error)
    {
        super();
        this.name = error.name;
        this.message = error.message;
        this.stack = error.stack;
    }
}

import Exception from './Exceptions/Exception';


export default class CacheExpiredException extends Exception
{
    constructor()
    {
        super("The cache has expired");
        this.name = "CacheExpiredException";
    }
}

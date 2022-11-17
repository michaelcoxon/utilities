import Exception from '../Exceptions/Exception.js';




export default function isException(subject: unknown | Exception): subject is Exception
{
    if (subject instanceof Exception)
    {
        return true;
    }
    else if (subject instanceof Object)
    {
        return subject['innerException'] !== undefined;
    }
    return false;
}


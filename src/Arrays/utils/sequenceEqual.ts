import { isUndefinedOrNull } from '../../TypeHelpers';

/**
 * Returns true if the sequence is equal
 * @param a array 1
 * @param b array 2
 * @param anyOrder set to true if you do not care about the order of the arrays
 */
export default function sequenceEqual<T>(a: T[], b: T[]): boolean
{
    // ref check
    if (a === b)
    {
        return true;
    }
    // null check
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    {
        return false;
    }
    // size check
    if (a.length != b.length)
    {
        return false;
    }    
    // item check
    for (let i = 0; i < a.length; ++i)
    {
        if (a[i] !== b[i])
        {
            return false;
        }
    }
    return true;
}

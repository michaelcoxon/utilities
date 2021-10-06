import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';

/**
 * Returns true if the sequence is equal
 * @param a array 1
 * @param b array 2
 * @param anyOrder set to true if you do not care about the order of the arrays
 */
export default function sequenceEqual<T>(a: T[], b: T[], anyOrder = false)
{
    if (a === b)
    {
        return true;
    }
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    {
        return false;
    }
    if (a.length != b.length)
    {
        return false;
    }
    if (anyOrder)
    {
        // sort the arrays before testing them.
        a = [...a].sort();
        b = [...b].sort();
    }
    for (let i = 0; i < a.length; ++i)
    {
        if (a[i] !== b[i])
        {
            return false;
        }
    }
    return true;
}

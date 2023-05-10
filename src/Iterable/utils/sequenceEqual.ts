import { NotSupportedException } from '../../Exceptions';
import { isUndefinedOrNull } from '../../TypeHelpers';

/**
 * Returns true if the sequence is equal
 * @param a array 1
 * @param b array 2
 * @param anyOrder set to true if you do not care about the order of the arrays
 */
export default function sequenceEqual<T>(a: Iterable<T>, b: Iterable<T>, anyOrder = false): boolean
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
    // sort items if order is no care
    if (anyOrder)
    {
        throw new NotSupportedException();
        // sort the arrays before testing them.
        const arrA = [...a].sort();
        const arrB = [...b].sort();

        for (let i = 0; i < arrA.length; ++i)
        {
            if (arrA[i] !== arrB[i])
            {
                return false;
            }
        }
    }
    // item check

    


    return true;
}

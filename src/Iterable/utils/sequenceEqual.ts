import { IterableEnumerator } from '../../Enumerators';
import { isUndefinedOrNull } from '../../TypeHelpers';

/**
 * Returns true if the sequence is equal
 * @param a array 1
 * @param b array 2
 * @param anyOrder set to true if you do not care about the order of the arrays
 */
export default function sequenceEqual<T>(a: Iterable<T>, b: Iterable<T>): boolean
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

    const ae = new IterableEnumerator(a);
    const be = new IterableEnumerator(b);
    let aeMore = ae.moveNext();
    let beMore = be.moveNext();

    if (aeMore && beMore)
    {
        do
        {
            // item check
            if (ae.current !== be.current)
            {
                return false;
            }

        } while ((aeMore = ae.moveNext()) && (beMore = be.moveNext()));

        // if we got to the end or bailed early then test
        // writing it like this to be verbose.
        if (aeMore && beMore == false)
        {
            return false;
        }
    }
    else
    {
        return false;
    }

    return true;
}

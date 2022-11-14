import InvalidOperationException from '../../../Exceptions/InvalidOperationException.js';
import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate, Undefinable } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';
import take from './take.js';
import where from './where.js';



export default function singleOrDefault<T>(array: T[], predicate?: Predicate<T>): T | null
{
    if (!isUndefinedOrNull(predicate))
    {
        array = where(array, predicate);
    }

    const top2 = take(array, 2);

    if (top2.length == 1)
    {
        return top2[0];
    }
    else if (top2.length > 1)
    {
        throw new InvalidOperationException("More than one match in the collection!");
    }
    else
    {
        return null;
    }
}
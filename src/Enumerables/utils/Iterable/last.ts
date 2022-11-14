import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate, Undefinable } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';
import where from './where.js';



export default function last<T>(iterable: Iterable<T>, predicate?: Predicate<T>): T
{
    if (!isUndefinedOrNull(predicate))
    {
        iterable = where(iterable, predicate);
    }

    let current: Undefinable<T>;

    for (const item of iterable)
    {
        current = item;
    }

    if (isUndefinedOrNull(current))
    {
        throw new Error("There is no last item matching the predicate!");
    }
    
    return current;
}
import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate, Undefinable } from '../../../Types.js';
import where from './where.js';


export default function lastOrDefault<T>(iterable: Iterable<T>, predicate?: Predicate<T>): T | null
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
        return null;
    }
    
    return current;
}
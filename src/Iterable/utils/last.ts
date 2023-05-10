import { isUndefinedOrNull } from '../../TypeHelpers';
import { Predicate, Undefinable } from '../../Types';
import where from './where';



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
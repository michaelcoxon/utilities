import { isUndefinedOrNull } from '../../TypeHelpers';
import { Predicate } from '../../Types';
import where from './where';


export default function firstOrDefault<T>(iterable: Iterable<T>, predicate?: Predicate<T>): T | null
{
    if (!isUndefinedOrNull(predicate))
    {
        iterable = where(iterable, predicate);
    }

    for(const item of iterable)
    {
        return item;
    }

    return null;
}
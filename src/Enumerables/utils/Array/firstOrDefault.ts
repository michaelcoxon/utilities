import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';
import where from './where.js';


export default function firstOrDefault<T>(iterable: T[], predicate?: Predicate<T>): T | null
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
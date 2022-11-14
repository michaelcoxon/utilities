import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';
import where from './where.js';



export default function first<T>(iterable: Iterable<T>, predicate?: Predicate<T>): T
{
    if (!isUndefinedOrNull(predicate))
    {
        iterable = where(iterable, predicate);
    }

    for(const item of iterable)
    {
        return item;
    }

    throw new Error("The collection is empty!");
}
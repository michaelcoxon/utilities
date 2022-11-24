import { isUndefinedOrNull } from '../../../TypeHelpers';
import { Predicate } from '../../../Types';
import { IEnumerable } from '../../_types';
import where from './where';



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
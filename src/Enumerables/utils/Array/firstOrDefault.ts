import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull';
import { Predicate } from '../../../Types';
import { IEnumerable } from '../../_types';
import where from './where';


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
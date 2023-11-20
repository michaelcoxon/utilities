import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull';
import { Predicate } from '../../Types';
import item from './item';
import where from './where';


export default function firstOrDefault<T>(array: T[], predicate?: Predicate<T>, defaultValue = null): T | typeof defaultValue
{
    if (!isUndefinedOrNull(predicate))
    {
        array = where(array, predicate);
    }

    return  item(array, 0) ?? defaultValue;
}
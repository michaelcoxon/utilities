import { isUndefinedOrNull } from '../../TypeHelpers';
import { Predicate } from '../../Types';
import item from './item';
import where from './where';


export default function lastOrDefault<T>(array: T[], predicate?: Predicate<T>, defaultValue = null): T | typeof defaultValue
{
    if (!isUndefinedOrNull(predicate))
    {
        array = where(array, predicate);
    }

    return item(array, -1) ?? defaultValue;
}
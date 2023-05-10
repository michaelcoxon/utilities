import { isUndefinedOrNull } from '../../TypeHelpers';
import { Predicate } from '../../Types';
import where from './where';


export default function lastOrDefault<T>(array: T[], predicate?: Predicate<T>): T | null
{
    if (!isUndefinedOrNull(predicate))
    {
        array = where(array, predicate);
    }

    return array[array.length - 1] ?? null;
}
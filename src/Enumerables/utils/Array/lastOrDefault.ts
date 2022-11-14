import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate } from '../../../Types.js';
import where from './where.js';


export default function lastOrDefault<T>(array: T[], predicate?: Predicate<T>): T | null
{
    if (!isUndefinedOrNull(predicate))
    {
        array = where(array, predicate);
    }

    return array[array.length - 1] ?? null;
}
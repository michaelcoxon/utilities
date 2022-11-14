import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate } from '../../../Types.js';

export default function any<T>(array: T[], predicate?: Predicate<T>): boolean
{
    if (isUndefinedOrNull(predicate))
    {
        return array.length > 0;
    }
    return array.some(predicate);
}
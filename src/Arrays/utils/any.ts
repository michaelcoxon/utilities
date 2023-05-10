import { isUndefinedOrNull } from '../../TypeHelpers';
import { Predicate } from '../../Types';

export default function any<T>(array: T[], predicate?: Predicate<T>): boolean
{
    if (isUndefinedOrNull(predicate))
    {
        return array.length > 0;
    }
    return array.some(predicate);
}
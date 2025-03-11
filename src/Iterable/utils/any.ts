import { isUndefinedOrNull } from '../../TypeHelpers';
import { Predicate } from '../../Types';

export default function any<T>(iterable: Iterable<T>, predicate?: Predicate<T>): boolean
{
    for (const item of iterable)
    {
        if (isUndefinedOrNull(predicate) || predicate(item))
        {
            return true;
        }
    }

    return false;
}
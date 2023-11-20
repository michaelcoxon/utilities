import InvalidOperationException from '../../Exceptions/InvalidOperationException';
import { isUndefinedOrNull } from '../../TypeHelpers';
import { Predicate } from '../../Types';
import take from './take';
import where from './where';



export default function singleOrDefault<T>(array: T[], predicate?: Predicate<T>, defaultValue = null): T | typeof defaultValue
{
    if (!isUndefinedOrNull(predicate))
    {
        array = where(array, predicate);
    }

    const top2 = take(array, 2);

    if (top2.length == 1)
    {
        return top2[0];
    }
    else if (top2.length > 1)
    {
        throw new InvalidOperationException("More than one match in the collection!");
    }
    else
    {
        return defaultValue;
    }
}
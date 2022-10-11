import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull';
import { Predicate } from '../../../Types';
import { IEnumerable } from '../../_types';


export default function lastOrDefault<T>(enumerable: IEnumerable<T>, predicate?: Predicate<T>): T | null
{
    let array = enumerable.toArray().reverse();

    if (array.length == 0)
    {
        return null;
    }

    if (!isUndefinedOrNull(predicate))
    {
        array = array.filter(predicate);
    }

    if (array.length > 0)
    {
        return array[0];
    }
    else
    {
        return null;
    }
}
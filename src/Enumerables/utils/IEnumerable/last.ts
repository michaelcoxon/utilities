import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';



export default function last<T>(enumerable: IEnumerable<T>, predicate?: Predicate<T>): T
{
    let array = enumerable.toArray().reverse();

    if (array.length == 0)
    {
        throw new Error("The collection is empty!");
    }

    if (!isUndefinedOrNull(predicate))
    {
        array = array.filter(predicate);
    }

    if (array.length > 0)
    {
        return array[0]
    }
    else
    {
        throw new Error("There is no last item matching the predicate!");
    }
}
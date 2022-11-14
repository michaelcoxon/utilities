import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';



export default function first<T>(enumerable: IEnumerable<T>, predicate?: Predicate<T>): T
{
    if (!isUndefinedOrNull(predicate))
    {
        enumerable = enumerable.where(predicate);
    }

    const en = enumerable.getEnumerator();

    if (en.moveNext())
    {
        return en.current;
    }

    throw new Error("The collection is empty!");
}
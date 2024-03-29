import { isUndefinedOrNull } from '../../../TypeHelpers';
import { Predicate, Undefinable } from '../../../Types';
import { IEnumerable } from '../../_types';



export default function singleOrDefault<T>(enumerable: IEnumerable<T>, predicate?: Predicate<T>): T | null
{
    if (!isUndefinedOrNull(predicate))
    {
        enumerable = enumerable.where(predicate);
    }

    const en = enumerable.take(2).getEnumerator();

    let returnValue: Undefinable<T>;

    while (en.moveNext())
    {
        if (!isUndefinedOrNull(returnValue))
        {
            // TODO: should this throw here?  throw new InvalidOperationException("More than one match in the collection!");
            return null;
        }
        returnValue = en.current;
    }

    if (isUndefinedOrNull(returnValue))
    {
        return null;
    }

    return returnValue;
}
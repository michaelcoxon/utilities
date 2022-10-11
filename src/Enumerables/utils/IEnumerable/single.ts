import InvalidOperationException from '../../../Exceptions/InvalidOperationException';
import NullReferenceException from '../../../Exceptions/NullReferenceException';
import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull';
import { Predicate, Undefinable } from '../../../Types';
import { IEnumerable } from '../../_types';


export default function single<T>(enumerable: IEnumerable<T>, predicate?: Predicate<T>): T
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
            throw new InvalidOperationException("More than one match in the collection!");
        }
        returnValue = en.current;
    }

    if (isUndefinedOrNull(returnValue))
    {
        throw new NullReferenceException("The result is undefined!");
    }

    return returnValue;
}
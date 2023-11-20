import { isUndefinedOrNull } from '../../TypeHelpers';
import { Predicate } from '../../Types';
import item from './item';
import where from './where';



export default function first<T>(array: T[], predicate?: Predicate<T>): T
{
    if (!isUndefinedOrNull(predicate))
    {
        array = [...where(array, predicate)];
    }

    const value = item(array, 0);
    if (isUndefinedOrNull(value))
    {
        throw new Error("The collection is empty!");
    }
    return value;
}
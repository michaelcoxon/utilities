import { isUndefinedOrNull } from '../../TypeHelpers';
import { Predicate } from '../../Types';
import where from './where';



export default function first<T>(array: T[], predicate?: Predicate<T>): T
{
    if (!isUndefinedOrNull(predicate))
    {
        array = [...where(array, predicate)];
    }

    for (const item of array)
    {
        return item;
    }

    throw new Error("The collection is empty!");
}
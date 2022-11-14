import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate } from '../../../Types.js';
import where from './where.js';



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
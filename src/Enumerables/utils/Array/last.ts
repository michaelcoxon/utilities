import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate,  } from '../../../Types.js';
import lastOrDefault from './lastOrDefault.js';



export default function last<T>(array: T[], predicate?: Predicate<T>): T
{
    const value = lastOrDefault(array, predicate);

    if (isUndefinedOrNull(value))
    {
        throw new Error("There is no last item matching the predicate!");
    }

    return value;
}
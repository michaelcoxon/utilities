import { isUndefinedOrNull } from '../../../TypeHelpers';
import { Predicate,  } from '../../../Types';
import lastOrDefault from './lastOrDefault';



export default function last<T>(array: T[], predicate?: Predicate<T>): T
{
    const value = lastOrDefault(array, predicate);

    if (isUndefinedOrNull(value))
    {
        throw new Error("There is no last item matching the predicate!");
    }

    return value;
}
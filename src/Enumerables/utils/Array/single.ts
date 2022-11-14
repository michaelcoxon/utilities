import  InvalidOperationException  from '../../../Exceptions/InvalidOperationException.js';
import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Predicate } from '../../../Types.js';
import take from './take.js';
import where from './where.js';


export default function single<T>(iterable: T[], predicate?: Predicate<T>): T
{
    if (!isUndefinedOrNull(predicate))
    {
        iterable = where(iterable, predicate);
    }

    const top2 = take(iterable, 2);

    if (top2.length == 1)
    {
        return top2[0];
    }
    else if (top2.length > 1)
    {
        throw new InvalidOperationException("More than one match in the collection!");
    }
    else
    {
        throw new Error("The collection is empty!");
    }
}
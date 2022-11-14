import isUndefinedOrNull from '../../../TypeHelpers/isUndefinedOrNull.js';
import { Selector } from '../../../Types.js';



export default function* select<T, TOut>(iterable: Iterable<T>, selector?: Selector<T, TOut>): Iterable<TOut>
{
    if(isUndefinedOrNull(selector))
    {
        return iterable;
    }
    for (const input of iterable)
    {
        yield selector(input);
    }
}

import { isUndefinedOrNull } from '../../TypeHelpers';
import { Selector } from '../../Types';

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

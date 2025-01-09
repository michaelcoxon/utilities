import { ensure } from '../../ensure';
import { Selector } from '../../Types';

export default function* select<T, TOut>(iterable: Iterable<T>, selector: Selector<T, TOut>): Iterable<TOut>
{
    ensure(selector, "selector").isNotNullOrUndefined();
    
    for (const item of iterable)
    {
        yield selector(item);
    }
}

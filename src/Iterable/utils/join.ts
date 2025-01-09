import { isNullOrEmpty } from '../../TypeHelpers';
import { Selector } from '../../Types';
import groupBy from './groupBy';




export default function* join<TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerKeySelector: Selector<TOuter, TKey>,
    innerKeySelector: Selector<TInner, TKey>,
    resultSelector: (outer: TOuter, inner: TInner) => TResult): Iterable<TResult>
{    
    const inners = groupBy(inner, innerKeySelector);

    for (const o of outer)
    {
        const oKey = outerKeySelector(o);
        const matches = inners.get(oKey);
        if (!isNullOrEmpty(matches))
        {
            for (const item of matches)
            {
                yield resultSelector(o, item);
            }
        }
    }
}

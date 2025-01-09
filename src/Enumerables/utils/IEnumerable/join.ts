import { Enumerable } from '../..';
import { isNullOrEmpty } from '../../../TypeHelpers';
import { Selector } from '../../../Types';
import { IEnumerable } from '../../_types';

export default function join<TOuter, TInner, TKey, TResult>(
    outer: IEnumerable<TOuter>,
    inner: IEnumerable<TInner>,
    outerKeySelector: Selector<TOuter, TKey>,
    innerKeySelector: Selector<TInner, TKey>,
    resultSelector: (outer: TOuter, inner: TInner) => TResult): IEnumerable<TResult>
{
    const inners = inner.groupBy(innerKeySelector).toDictionary(i => i.key, i => i);

    let result: IEnumerable<TResult> = Enumerable.asEnumerable([]);

    for (const o of outer)
    {
        const oKey = outerKeySelector(o);
        const matches = inners.itemByKey(oKey);

        if (!isNullOrEmpty(matches))
        {
            result = result.concat(matches.select((item) => resultSelector(o, item)));
        }
    }

    return result;
}

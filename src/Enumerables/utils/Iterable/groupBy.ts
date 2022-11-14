import { Selector } from '../../../Types.js';
import distinct from './distinct.js';
import select from './select.js';
import where from './where.js';



export default function* groupBy<T, TKey>(iterable: Iterable<T>, keySelector: Selector<T, TKey>): Iterable<{ key: TKey, items: Iterable<T>; }>
{
    const keys = select(distinct(iterable, keySelector), keySelector);

    for (const key of keys)
    {
        const items = where(iterable, i => keySelector(i) == key);
        yield { key, items };
    }
}
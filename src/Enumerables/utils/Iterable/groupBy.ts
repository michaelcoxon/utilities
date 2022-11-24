import { Selector } from '../../../Types';
import distinct from './distinct';
import select from './select';
import where from './where';



export default function* groupBy<T, TKey>(iterable: Iterable<T>, keySelector: Selector<T, TKey>): Iterable<{ key: TKey, items: Iterable<T>; }>
{
    const keys = select(distinct(iterable, keySelector), keySelector);

    for (const key of keys)
    {
        const items = where(iterable, i => keySelector(i) == key);
        yield { key, items };
    }
}
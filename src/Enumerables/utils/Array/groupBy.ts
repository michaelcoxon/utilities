import { Selector } from '../../../Types';
import distinct from './distinct';
import select from './select';
import where from './where';



export default function groupBy<T, TKey>(array: T[], keySelector: Selector<T, TKey>): { key: TKey, items: T[]; }[]
{
    const keys = select(distinct(array, keySelector), keySelector);
    const result: { key: TKey, items: T[]; }[]  = [];
    
    for (const key of keys)
    {
        const items = where(array, i => keySelector(i) == key);
        result.push({ key, items });
    }
    return result;
}
import { Selector } from '../../../Types.js';
import distinct from './distinct.js';
import select from './select.js';
import where from './where.js';



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
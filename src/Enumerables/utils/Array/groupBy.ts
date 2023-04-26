import { DefaultComparers, IComparer } from '../../../Comparers';
import { Selector } from '../../../Types';
import distinct from './distinct';
import select from './select';
import where from './where';

export interface IArrayGroup<T, TKey> extends Array<T>
{
    key: TKey;
}

export default function groupBy<T, TKey>(array: T[], keySelector: Selector<T, TKey>, comparer: IComparer<TKey> = DefaultComparers.DefaultComparer): Array<IArrayGroup<T, TKey>>
{
    const keys = select(distinct(array, keySelector), keySelector);
    const result: Array<IArrayGroup<T, TKey>>  = [];
    
    for (const key of keys)
    {
        const items = where(array, i => comparer.equals(keySelector(i) , key)) as IArrayGroup<T, TKey>;
        items.key = key;

        result.push(items);
    }
    return result;
}
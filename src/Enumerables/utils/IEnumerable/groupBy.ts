import { IComparer, DefaultComparers } from '../../../Comparers';
import { IEnumerator } from '../../../Enumerators';
import { Selector } from '../../../Types';
import { IEnumerable, IEnumerableGroup } from '../../_types';
import EnumerableBase from './EnumerableBase';






export default function groupBy<T, TKey>(source: IEnumerable<T>, selector: Selector<T, TKey>, comparer: IComparer<TKey> = DefaultComparers.DefaultComparer): IEnumerable<IEnumerableGroup<T, TKey>>
{
    const keySet = source.select(selector).distinct((k) => k).orderBy(k => k);
    return keySet.select((key) => new EnumerableGroup(source, key, selector, comparer));
}

class EnumerableGroup<T, TKey> extends EnumerableBase<T> implements IEnumerableGroup<T, TKey>
{
    readonly #key: TKey;
    readonly #enumerable: IEnumerable<T>;

    constructor(parentEnumerable: IEnumerable<T>, key: TKey, keySelector: Selector<T, TKey>, keyComparer: IComparer<TKey>)
    {
        super();
        this.#enumerable = parentEnumerable.where(item => keyComparer.equals(keySelector(item), key));
        this.#key = key;
    }

    public get key(): TKey
    {
        return this.#key;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return this.#enumerable.getEnumerator();
    }
}


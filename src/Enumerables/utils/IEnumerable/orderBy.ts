import { IComparer, MapComparer, DefaultComparers } from '../../../Comparers';
import { IEnumerable } from '../../_types';











export default function orderBy<T, R>(source: IEnumerable<T>, selector: (a: T) => R, comparer?: IComparer<R>): IEnumerable<T>
{
    // HACK: this could be better...
    const list = source.toList();
    const mapComparer = new MapComparer(selector, comparer || DefaultComparers.DefaultComparer);
    list.sort(mapComparer);
    return list;
}
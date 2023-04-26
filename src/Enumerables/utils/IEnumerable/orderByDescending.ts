import { IComparer, MapComparer, ReverseComparer, DefaultComparers } from '../../../Comparers';
import { IEnumerable } from '../../_types';











export default function orderByDescending<T, R>(source: IEnumerable<T>, selector: (a: T) => R, comparer?: IComparer<R>): IEnumerable<T>
{
    // HACK: this could be better...
    const list = source.toList();
    const mapComparer = new MapComparer(selector, new ReverseComparer(comparer || DefaultComparers.DefaultComparer));
    list.sort(mapComparer);
    return list;
}
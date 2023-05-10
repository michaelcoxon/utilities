import DefaultComparers from '../../Comparers/DefaultComparers';
import MapComparer from '../../Comparers/MapComparer';
import { IComparer } from '../../Comparers/_types';
import { Selector } from '../../Types';

export default function orderBy<T, R>(array: T[], selector: Selector<T, R>, comparer: IComparer<R> = DefaultComparers.DefaultComparer)
{
    const mapComparer = new MapComparer(selector, comparer);
    return array.sort((a, b) => mapComparer.compare(a, b));
}

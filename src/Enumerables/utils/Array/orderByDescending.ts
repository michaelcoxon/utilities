import DefaultComparers from '../../../Comparers/DefaultComparers';
import ReverseComparer from '../../../Comparers/ReverseComparer';
import MapComparer from '../../../Comparers/MapComparer';
import { IComparer } from '../../../Comparers/_types';
import { Selector } from '../../../Types';

export default function orderByDescending<T, R>(array: T[], selector: Selector<T, R>, comparer: IComparer<R> = DefaultComparers.DefaultComparer)
{
    const mapComparer = new MapComparer(selector, new ReverseComparer(comparer || DefaultComparers.DefaultComparer));
    return array.sort((a, b) => mapComparer.compare(a, b));
}

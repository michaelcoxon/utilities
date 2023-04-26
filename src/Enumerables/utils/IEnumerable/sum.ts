import { Selector } from '../../../Types';
import { IEnumerable } from '../../_types';



export default function sum<T>(source: IEnumerable<T>, selector: Selector<T, number>): number
{
    return source.select<number>((item) => selector(item))
        .toArray()
        .reduce((a, c) => a + c, 0);
}
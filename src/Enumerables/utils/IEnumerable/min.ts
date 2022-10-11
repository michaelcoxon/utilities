import { Selector } from '../../../Types';
import { IEnumerable } from '../../_types';



export default function min<T>(enumerable: IEnumerable<T>, selector: Selector<T, number>): number
{
    const values = enumerable.select<number>(selector);
    return Math.min(...values);
}
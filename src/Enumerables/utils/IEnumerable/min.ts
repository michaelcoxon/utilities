import { Selector } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';



export default function min<T>(enumerable: IEnumerable<T>, selector: Selector<T, number>): number
{
    const values = enumerable.select<number>(selector);
    return Math.min(...values);
}
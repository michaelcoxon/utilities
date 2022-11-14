import { Selector } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';



export default function average<T>(enumerable: IEnumerable<T>, selector: Selector<T, number>): number
{
    return enumerable.sum(selector) / enumerable.count();
}
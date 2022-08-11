import { Selector } from '../../../Types';
import { IEnumerable } from '../../_types';



export default function average<T>(enumerable: IEnumerable<T>, selector: Selector<T, number>): number
{
    return enumerable.sum(selector) / enumerable.count();
}
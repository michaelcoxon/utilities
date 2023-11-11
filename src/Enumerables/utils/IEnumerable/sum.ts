import type { Selector } from '../../../Types';
import type { IEnumerable } from '../../_types';
import toArray from './toArray';


/**
 * Sums the items in the enumerable using the selector
 * @param selector selector to return the number to be summed
 */
export default function sum<T>(enumerable: IEnumerable<T>, selector: Selector<T, number>): number
{
    return toArray(enumerable.select<number>((item) => selector(item))).reduce((a, c) => a + c, 0);
}
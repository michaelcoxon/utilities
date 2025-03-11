import type { Selector } from '../../../Types';
import type { IEnumerable } from '../../_types';
import asArray from '../asArray';


/**
 * Sums the items in the enumerable using the selector
 * @param selector selector to return the number to be summed
 */
export default function sum<T>(enumerable: IEnumerable<T>, selector: Selector<T, number>): number
{
    const en = enumerable.select<number>((item) => selector(item));
    return asArray(en).reduce((a, c) => a + c, 0);
}
import type { Predicate } from '../../../Types';
import type { IEnumerable } from '../../_types';


/**
 * Splits a enumerable into two queryables. One set is for true predicates, the other set is for false predicates.
 * @param predicate
 */
export default function split<T>(enumerable: IEnumerable<T>, predicate: Predicate<T>): { pTrue: IEnumerable<T>, pFalse: IEnumerable<T>; }
{
    return {
        pTrue: enumerable.where(i => predicate(i)),
        pFalse: enumerable.where(i => !predicate(i))
    };
}
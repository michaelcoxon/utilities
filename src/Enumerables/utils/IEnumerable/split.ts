import { Predicate } from '../../../Types';
import { IEnumerable } from '../../_types';





export default function split<T>(source: IEnumerable<T>, predicate: Predicate<T>): { pTrue: IEnumerable<T>, pFalse: IEnumerable<T>; }
{
    return {
        pTrue: source.where(i => predicate(i)),
        pFalse: source.where(i => !predicate(i))
    };
}
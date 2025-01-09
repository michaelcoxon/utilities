import { Selector } from '../../../Types';
import { IEnumerable } from '../../_types';






export default function toMap<T, K, V>(enumerable: IEnumerable<T>, keySelector: Selector<T, K>, valueSelector: Selector<T, V>): Map<K, V>
{
    return new Map(createKeyValuePairs(enumerable, keySelector, valueSelector));
}

function* createKeyValuePairs<T, K, V>(iterable: IEnumerable<T>, keySelector: Selector<T, K>, valueSelector: Selector<T, V>): Iterable<readonly [K, V]>
{
    for (const item of iterable)
    {
        yield [keySelector(item), valueSelector(item)];
    }
}
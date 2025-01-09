import { Selector } from '../../Types';






export default function toMap<T, K, V>(array: T[], keySelector: Selector<T, K>, valueSelector: Selector<T, V>): Map<K, V>
{
    return new Map(createKeyValuePairs(array, keySelector, valueSelector));
}

function* createKeyValuePairs<T, K, V>(iterable: Iterable<T>, keySelector: Selector<T, K>, valueSelector: Selector<T, V>): Iterable<readonly [K, V]>
{
    for (const item of iterable)
    {
        yield [keySelector(item), valueSelector(item)];
    }
}
import { IDictionary } from '../../_types';
import Dictionary from '../../Dictionary';


export default function toDictionary<T, TKey, TValue>(array: T[],keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
{
    return array.reduce(
        (dict, val) =>
        {
            dict.addKeyValue(keySelector(val), valueSelector(val));
            return dict;
        },
        new Dictionary<TKey, TValue>()
    );
}
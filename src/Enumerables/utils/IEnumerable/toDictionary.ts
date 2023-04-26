import  Dictionary from '../../Dictionary';
import { IDictionary, IEnumerable } from '../../_types';



export default function toDictionary<T, TKey, TValue>(source: IEnumerable<T>, keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
{
    const dictionary = new Dictionary<TKey, TValue>();
    source.forEach(i =>
    {
        dictionary.addKeyValue(keySelector(i), valueSelector(i));
    });
    return dictionary;
}
import  List  from "./List";
import  Dictionary  from "./Dictionary";
import { IDictionary, IEnumerable, IList } from './_types';

export function toArray<T>(source: IEnumerable<T>): T[]    
{
    const array: T[] = [];
    const en = source.getEnumerator();
    while (en.moveNext())
    {
        array.push(en.current);
    }
    return array;
}

export function toDictionary<T, TKey, TValue>(
    source: IEnumerable<T>, 
    keySelector: (a: T) => TKey, 
    valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>    
{
    const dictionary = new Dictionary<TKey, TValue>();
    const en = source.getEnumerator();
    while (en.moveNext())
    {
        dictionary.addKeyValue(keySelector(en.current), valueSelector(en.current));
    }
    return dictionary;
}

export function toList<T>(source: IEnumerable<T>): IList<T>    
{
    const list = new List<T>();
    const en = source.getEnumerator();
    while (en.moveNext())
    {
        list.add(en.current);
    }
    return list;
}    
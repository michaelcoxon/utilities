import ArrayEnumerator from "../Enumerators/ArrayEnumerator";
import { IDictionary, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import { toArray, toDictionary, toList } from './_helpers';
import  Enumerable  from "./Enumerable";


export  default class ArrayEnumerable<T> extends Enumerable<T>
{
    protected _array: T[];

    constructor(array: T[])
    {
        super();
        this._array = array;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new ArrayEnumerator<T>(this._array);
    }

    public toArray(): T[]
    {
        return toArray(this);
    }
    public toDictionary<TKey, TValue>(keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
    {
        return toDictionary(this, keySelector, valueSelector);
    }
    public toList(): IList<T>
    {
        return toList(this);
    }
}

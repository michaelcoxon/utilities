import TakeEnumerator from "../Enumerators/TakeEnumerator";
import { IDictionary, IEnumerable, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import  Enumerable from "./Enumerable";
import { toArray, toDictionary, toList } from './_helpers';

export default  class TakeEnumerable<T> extends Enumerable<T> {
    readonly #enumerable: IEnumerable<T>;
    #itemsToTake: number;

    constructor(enumerable: IEnumerable<T>, itemsToTake: number)
    {
        super();
        this.#enumerable = enumerable;
        this.#itemsToTake = itemsToTake;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new TakeEnumerator<T>(this.#enumerable.getEnumerator(), this.#itemsToTake);
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

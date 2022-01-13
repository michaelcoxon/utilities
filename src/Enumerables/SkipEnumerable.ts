import SkipEnumerator from "../Enumerators/SkipEnumerator";
import { IDictionary, IEnumerable, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import  Enumerable  from "./Enumerable";
import { toArray, toDictionary, toList } from './_helpers';

export default  class SkipEnumerable<T> extends Enumerable<T> {
    readonly #enumerable: IEnumerable<T>;
    #itemsToSkip: number;

    constructor(enumerable: IEnumerable<T>, itemsToSkip: number)
    {
        super();
        this.#enumerable = enumerable;
        this.#itemsToSkip = itemsToSkip;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new SkipEnumerator<T>(this.#enumerable.getEnumerator(), this.#itemsToSkip);
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

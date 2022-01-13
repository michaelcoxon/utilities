import { Predicate } from "../Types";
import WhereEnumerator from "../Enumerators/WhereEnumerator";
import { IDictionary, IEnumerable, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import Enumerable from "./Enumerable";
import { toArray, toDictionary, toList } from './_helpers';

export default  class WhereEnumerable<T> extends Enumerable<T> {
    readonly #enumerable: IEnumerable<T>;
    readonly #predicate: Predicate<T>;

    constructor(enumerable: IEnumerable<T>, predicate: Predicate<T>)
    {
        super();
        this.#enumerable = enumerable;
        this.#predicate = predicate;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new WhereEnumerator<T>(this.#enumerable.getEnumerator(), this.#predicate);
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

import { Selector } from "../Types";
import SelectEnumerator from "../Enumerators/SelectEnumerator";
import { IDictionary, IEnumerable, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import  Enumerable  from "./Enumerable";
import { toArray, toDictionary, toList } from './_helpers';

export default  class SelectEnumerable<T, TReturn> extends Enumerable<TReturn> {
    readonly #enumerable: IEnumerable<T>;
    readonly #selector: Selector<T, TReturn>;

    constructor(enumerable: IEnumerable<T>, selector: Selector<T, TReturn>)
    {
        super();
        this.#enumerable = enumerable;
        this.#selector = selector;
    }

    public getEnumerator(): IEnumerator<TReturn>
    {
        return new SelectEnumerator<T, TReturn>(this.#enumerable.getEnumerator(), this.#selector);
    }

    public toArray(): TReturn[]
    {
        return toArray(this);
    }
    public toDictionary<TKey, TValue>(keySelector: (a: TReturn) => TKey, valueSelector: (a: TReturn) => TValue): IDictionary<TKey, TValue>
    {
        return toDictionary(this, keySelector, valueSelector);
    }
    public toList(): IList<TReturn>
    {
        return toList(this);
    }
}

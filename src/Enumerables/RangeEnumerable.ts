import { IDictionary, IList } from '.';
import RangeEnumerator from "../Enumerators/RangeEnumerator";
import { IEnumerator } from '../Enumerators/_types';
import  Enumerable  from "./Enumerable";
import { toArray, toDictionary, toList } from './_helpers';

export default  class RangeEnumerable extends Enumerable<number> {
    readonly #start: number;
    readonly #count: number;

    constructor(start: number, count: number)
    {
        super();
        this.#start = start;
        this.#count = count;
    }

    public getEnumerator(): IEnumerator<number>
    {
        return new RangeEnumerator(this.#start, this.#count);
    }
    public toArray(): number[]
    {
        return toArray(this);
    }
    public toDictionary<TKey, TValue>(keySelector: (a: number) => TKey, valueSelector: (a: number) => TValue): IDictionary<TKey, TValue>
    {
        return toDictionary(this, keySelector, valueSelector);
    }
    public toList(): IList<number>
    {
        return toList(this);
    }
}

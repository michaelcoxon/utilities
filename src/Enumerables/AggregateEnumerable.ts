import AggregateEnumerator from "../Enumerators/AggregateEnumerator";
import { IEnumerable, IDictionary, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import { toArray, toDictionary, toList } from './_helpers';
import  Enumerable  from "./Enumerable";


export default class AggregateEnumerable<T, TReturn> extends Enumerable<TReturn>
{
    readonly #enumerable: IEnumerable<T>;
    readonly #aggregateFunction: (acumulate: TReturn, current: T) => TReturn;
    readonly #initialValue: TReturn;

    constructor(enumerable: IEnumerable<T>, aggregateFunction: (acumulate: TReturn, current: T) => TReturn, initialValue: TReturn)
    {
        super();
        this.#enumerable = enumerable;
        this.#aggregateFunction = aggregateFunction;
        this.#initialValue = initialValue;
    }

    public getEnumerator(): IEnumerator<TReturn>
    {
        return new AggregateEnumerator(this.#enumerable.getEnumerator(), this.#aggregateFunction, this.#initialValue);
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

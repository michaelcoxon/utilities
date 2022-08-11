import AggregateEnumerator from "../Enumerators/AggregateEnumerator";
import { IEnumerable } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import { EnumerableBase } from './index';


export class AggregateEnumerable<T, TReturn> extends EnumerableBase<TReturn>
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
}

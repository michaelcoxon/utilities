import { IEnumerator } from "./IEnumerator";
import EnumeratorBase from "./EnumeratorBase";
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import NullReferenceException from '../Exceptions/NullReferenceException';
import { Undefinable } from '../Types';

/**
 * 
 */
export default class AggregateEnumerator<T, TReturn> extends EnumeratorBase<TReturn> implements IEnumerator<TReturn>
{
    readonly #enumerator: IEnumerator<T>;
    readonly #aggregateFunction: (acumulate: TReturn, current: T) => TReturn;
    readonly #initialValue?: TReturn;

    #accumulate?: TReturn;

    constructor(enumerator: IEnumerator<T>, aggregateFunction: (acumulate: TReturn, current: T) => TReturn, initialValue?: TReturn)
    {
        super();
        this.#enumerator = enumerator;
        this.#aggregateFunction = aggregateFunction;
        this.#accumulate = initialValue;
        this.#initialValue = initialValue;
    }

    public get current(): TReturn
    {
        if (isUndefinedOrNull(this.#accumulate))
        {
            throw new NullReferenceException();
        }
        return this.#accumulate;
    }

    moveNext(): boolean
    {
        const currentValue = this.#accumulate = this.peek();

        if (currentValue === undefined)
        {
            return false;
        }

        return this.#enumerator.moveNext();
    }

    peek(): Undefinable<TReturn>
    {
        const item = this.#enumerator.peek();

        if (item === undefined)
        {
            return;
        }

        return this.#aggregateFunction(this.#accumulate!, item);
    }

    reset(): void
    {
        this.#enumerator.reset();
        this.#accumulate = this.#initialValue;
    }
}

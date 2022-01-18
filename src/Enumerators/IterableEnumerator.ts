import { OutOfBoundsException } from '../Exceptions';
import InvalidOperationException from '../Exceptions/InvalidOperationException';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import { Undefinable } from '../Types';
import EnumeratorBase from './EnumeratorBase';
import { IEnumerator } from './_types';

export default class IterableEnumerator<T> extends EnumeratorBase<T> implements IEnumerator<T>
{
    // the internal array
    readonly #iterable: Iterable<T>;
    #items: Generator<T, void, unknown>;
    #current?: IteratorResult<T, void>;
    #peak?: IteratorResult<T, void>;


    constructor(iterable: Iterable<T>)
    {
        super();
        this.#iterable = iterable;
        this.#items = IterableEnumerator.items<T>(this.#iterable);
    }

    // returns the current element
    public get current(): T
    {
        if (!isUndefinedOrNull(this.#current))
        {
            const value = this.#current.value;

            if (value === void (0))
            {
                throw new OutOfBoundsException("[void] Must call moveNext() before getting current.", -1, -1);
            }
            return value;
        }
        throw new OutOfBoundsException("Must call moveNext() before getting current.", -1, -1);
    }

    public moveNext(): boolean
    {
        if (!isUndefinedOrNull(this.#peak))
        {
            this.#current = this.#peak;
            this.#peak = undefined;
        }
        else
        {
            this.#current = this.#items.next();
        }
        return !this.#current.done;
    }

    // returns the next element without moving the pointer forwards
    public peek(): Undefinable<T>
    {
        if (isUndefinedOrNull(this.#peak))
        {
            this.#peak = this.#items.next();
            if (isUndefinedOrNull(this.#peak))
            {
                return undefined;
            }
        }
        return this.#peak.value ?? undefined;
    }

    // reset the pointer to the start
    public reset(): void
    {
        this.#items = IterableEnumerator.items<T>(this.#iterable);
    }

    private static *items<T>(iterable: Iterable<T>)
    {
        for (const item of iterable)
        {
            yield item;
        }
    }
}

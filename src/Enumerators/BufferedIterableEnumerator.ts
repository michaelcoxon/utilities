import { Undefinable } from '../Types';
import BufferedEnumerator from './BufferedEnumerator';
import EnumeratorBase from './EnumeratorBase';
import IterableEnumerator from './IterableEnumerator';
import { IEnumerator } from './_types';

export default class BufferedIterableEnumerator<T> extends EnumeratorBase<T> implements IEnumerator<T>
{
    readonly #innerEnumerator: BufferedEnumerator<T>;

    constructor(iterable: Iterable<T>)
    {
        super();
        this.#innerEnumerator = new BufferedEnumerator(new IterableEnumerator(iterable));
    }

    // returns the current element
    public get current(): T
    {
        return this.#innerEnumerator.current;
    }

    public moveNext(): boolean
    {
        return this.#innerEnumerator.moveNext();
    }

    // returns the next element without moving the pointer forwards
    public peek(): Undefinable<T>
    {
        return this.#innerEnumerator.peek();
    }

    // reset the pointer to the start
    public reset(): void
    {
        return this.#innerEnumerator.reset();
    }
}

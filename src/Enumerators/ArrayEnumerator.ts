import { IEnumerator } from './_types';
import EnumeratorBase from "./EnumeratorBase";
import { Undefinable } from '../Types';
import OutOfBoundsException from '../Exceptions/OutOfBoundsException';


export default class ArrayEnumerator<T> extends EnumeratorBase<T> implements IEnumerator<T>
{
    // the internal array
    readonly #baseArray: T[];

    // current pointer location
    #pointer = -1;

    /**
     * Enumerate an array.
     * @param array The array to enumerate.
     * @param immutable True means the enumerator takes a copy of the array. False uses the array.
     */
    constructor(array: T[], immutable: boolean = true)
    {
        super();

        if (immutable)
        {
            // copy the array to make this immutable.
            this.#baseArray = [...array];
        }
        else
        {
            this.#baseArray = array;
        }
    }

    // returns the current element
    public get current(): T
    {
        if (this.#pointer >= this.#baseArray.length || this.#pointer < 0)
        {
            this.throwOutOfBoundsException();
        }
        return this.#baseArray[this.#pointer];
    }

    public moveNext(): boolean
    {
        if (this.#pointer < this.#baseArray.length)
        {
            this.#pointer++;
        }
        return this.#pointer < this.#baseArray.length;
    }

    // returns the next element without moving the pointer forwards
    public peek(): Undefinable<T>
    {
        if (this.#pointer + 1 >= this.#baseArray.length)
        {
            return;
        }
        return this.#baseArray[this.#pointer + 1];
    }

    // reset the pointer to the start
    public reset(): void
    {
        this.#pointer = -1;
    }

    private throwOutOfBoundsException(): void
    {
        throw new OutOfBoundsException("internal pointer", 0, this.#baseArray.length - 1);
    }
}

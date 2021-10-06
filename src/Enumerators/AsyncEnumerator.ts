import OutOfBoundsException from '../Exceptions/OutOfBoundsException';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import { Awaitable } from '../Types';
import { IAsyncEnumerator } from './_types';


export default class AsyncEnumerator<T> implements IAsyncEnumerator<T>
{
    // the internal array
    readonly #baseArray: Awaitable<T>[];

    // current pointer location
    #pointer = -1;
    #current?: T;

    constructor(array: Awaitable<T>[])
    {
        this.#baseArray = array;
    }

    // returns the current element
    public get current(): T
    {
        if (!isUndefinedOrNull(this.#current) && this.#pointer < this.#baseArray.length && this.#pointer >= 0)
        {
            return this.#current;
        }
        throw new OutOfBoundsException("internal pointer", 0, this.#baseArray.length - 1);
    }

    public async moveNextAsync(): Promise<boolean>
    {
        if (this.#pointer < this.#baseArray.length)
        {
            this.#pointer++;
        }

        if (this.#pointer < this.#baseArray.length)
        {
            this.#current = await this.#baseArray[this.#pointer];
            return true;
        }

        else
        {
            this.#current = undefined;
            return false;
        }
    }
}

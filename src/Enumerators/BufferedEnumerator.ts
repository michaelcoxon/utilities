import { IEnumerator } from './_types';
import EnumeratorBase from "./EnumeratorBase";
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import NullReferenceException from '../Exceptions/NullReferenceException';
import { Undefinable } from '../Types';
import ArrayEnumerator from './ArrayEnumerator';


export default class BufferedEnumerator<T> extends EnumeratorBase<T> implements IEnumerator<T>
{
    readonly #enumerator: IEnumerator<T>;
    readonly #bufferedItems: T[];
    /** Reads the buffered items */
    #bufferedItemsEnumerator: IEnumerator<T>;

    #current: Undefinable<T>;

    constructor(enumerator: IEnumerator<T>)
    {
        super();
        this.#enumerator = enumerator;

        this.#bufferedItems = [];
        this.#bufferedItemsEnumerator = new ArrayEnumerator(this.#bufferedItems, false);
    }

    public get current(): T
    {
        if (isUndefinedOrNull(this.#current))
        {
            throw new NullReferenceException();
        }
        return this.#current;
    }

    public moveNext(): boolean
    {
        if (this.#bufferedItemsEnumerator.moveNext())
        {
            this.#current = this.#bufferedItemsEnumerator.current;
            return true;
        }
        else if (this.#enumerator.moveNext())
        {
            this.#bufferedItems.push(this.#current = this.#enumerator.current);
            return true;
        }
        else
        {
            this.#current = undefined;
            return false;
        }
    }

    public peek(): Undefinable<T>
    {
        let value: Undefinable<T> = undefined;

        if (!isUndefinedOrNull(value = this.#bufferedItemsEnumerator.peek()))
        {
            return value;
        }
        else if(this.#enumerator.moveNext())
        {
            this.#bufferedItems.push(value = this.#enumerator.current);
            return value;
        }
    }

    public reset(): void
    {
        this.#bufferedItemsEnumerator.reset();
        this.#enumerator.reset();
    }
}

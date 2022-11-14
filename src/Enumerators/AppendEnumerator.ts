import { IEnumerator } from './_types.js';
import EnumeratorBase from "./EnumeratorBase.js";
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull.js';
import NullReferenceException from '../Exceptions/NullReferenceException.js';
import { Undefinable } from '../Types.js';


export default class AppendEnumerator<T> extends EnumeratorBase<T> implements IEnumerator<T>
{
    readonly #enumerator: IEnumerator<T>;
    readonly #appendedItemsEnumerator: IEnumerator<T>;

    #current: Undefinable<T>;

    constructor(enumerator: IEnumerator<T>, appendedItemsEnumerator: IEnumerator<T>)
    {
        super();
        this.#enumerator = enumerator;
        this.#appendedItemsEnumerator = appendedItemsEnumerator;
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
        if (this.#enumerator.moveNext())
        {
            this.#current = this.#enumerator.current;
            return true;
        }
        else if (this.#appendedItemsEnumerator.moveNext())
        {
            this.#current = this.#appendedItemsEnumerator.current;
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

        if (!isUndefinedOrNull(value = this.#enumerator.peek()))
        {
            return value;
        }
        else if (!isUndefinedOrNull(value = this.#appendedItemsEnumerator.peek()))
        {
            return value;
        }

        else
        {
            return value;
        }
    }

    public reset(): void
    {
        this.#enumerator.reset();
        this.#appendedItemsEnumerator.reset();
    }
}

import { IEnumerator } from './_types.js';
import EnumeratorBase from "./EnumeratorBase.js";
import Exception from '../Exceptions/Exception.js';
import { Undefinable } from '../Types.js';


export default class SkipEnumerator<T> extends EnumeratorBase<T> implements IEnumerator<T> {

    readonly #enumerator: IEnumerator<T>;
    readonly #itemsToSkip: number;

    #currentItem?: T;
    #count: number;

    constructor(enumerator: IEnumerator<T>, itemsToSkip: number)
    {
        super();
        this.#enumerator = enumerator;
        this.#itemsToSkip = itemsToSkip;
        this.#count = 0;
    }

    public get current(): T
    {
        if (this.#currentItem === undefined)
        {
            throw new Exception("Current is undefined");
        }
        return this.#currentItem;
    }

    public moveNext(): boolean
    {
        this.#currentItem = this.peek();

        if (this.#currentItem === undefined)
        {
            return false;
        }

        return this.#enumerator.moveNext();
    }

    public peek(): Undefinable<T>
    {
        while (this.#count < this.#itemsToSkip)
        {
            if (!this.#enumerator.moveNext())
            {
                return undefined;
            }
            this.#count++;
        }
        return this.#enumerator.peek();

    }

    public reset(): void
    {
        this.#count = 0;
        this.#enumerator.reset();
    }
}

import { IEnumerator } from './_types.js';
import EnumeratorBase from "./EnumeratorBase.js";
import { Selector, Undefinable } from '../Types.js';
import Exception from '../Exceptions/Exception.js';


export default class SelectEnumerator<T, TReturn> extends EnumeratorBase<TReturn> implements IEnumerator<TReturn>
{
    readonly #enumerator: IEnumerator<T>;
    readonly #selector: Selector<T, TReturn>;

    #currentItem?: TReturn;

    constructor(enumerator: IEnumerator<T>, selector: Selector<T, TReturn>)
    {
        super();
        this.#enumerator = enumerator;
        this.#selector = selector;
    }

    public get current(): TReturn
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

    public peek(): Undefinable<TReturn>
    {
        const item = this.#enumerator.peek();

        if (item === undefined)
        {
            return;
        }

        return this.#selector(item);
    }

    public reset(): void
    {
        this.#enumerator.reset();
    }
}

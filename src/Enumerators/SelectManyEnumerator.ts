import { IEnumerator } from './_types';
import EnumeratorBase from "./EnumeratorBase";
import { Selector, Undefinable } from '../Types';
import Exception from '../Exceptions/Exception';
import { IEnumerable } from '../Enumerables/_types';


export default class SelectManyEnumerator<T, TReturn> extends EnumeratorBase<TReturn> implements IEnumerator<TReturn>
{
    #currentSetEnumerator?: IEnumerator<TReturn>;
    readonly #enumerator: IEnumerator<T>;
    readonly #selector: Selector<T, IEnumerable<TReturn>>;

    #currentItem?: TReturn;

    constructor(enumerator: IEnumerator<T>, selector: Selector<T, IEnumerable<TReturn>>)
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

        if (!this.#currentSetEnumerator)
        {
            this.#currentSetEnumerator = this.#selector(item).getEnumerator();
        }
        
        if (this.#currentSetEnumerator.moveNext())
        {
            //
        }
    }

    public reset(): void
    {
        this.#enumerator.reset();
    }
}

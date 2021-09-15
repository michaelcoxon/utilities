import { IEnumerator } from "./IEnumerator";
import EnumeratorBase from "./EnumeratorBase";
import Exception from '../Exceptions/Exception';
import { Predicate, Undefinable } from '../Types';


export default class WhereEnumerator<T> extends EnumeratorBase<T> implements IEnumerator<T> {

    readonly #enumerator: IEnumerator<T>;
    readonly #predicate: Predicate<T>;

    #currentItem?: T;

    constructor(enumerator: IEnumerator<T>, predicate: Predicate<T>)
    {
        super();
        this.#enumerator = enumerator;
        this.#predicate = predicate;
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
        for (; ;)
        {
            const item = this.#enumerator.peek();

            if (item === undefined)
            {
                return;
            }

            if (this.#predicate(item))
            {
                return item;
            }

            if (!this.#enumerator.moveNext())
            {
                break;
            }
        }
    }

    public reset(): void
    {
        this.#enumerator.reset();
    }
}

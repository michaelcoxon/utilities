import { IEnumerator } from "./IEnumerator";
import EnumeratorBase from "./EnumeratorBase";
import Exception from '../Exceptions/Exception';
import { Undefinable } from '../Types';


export default class TakeEnumerator<T> extends EnumeratorBase<T> implements IEnumerator<T> {

    readonly #enumerator: IEnumerator<T>;
    readonly #itemsToTake: number;

    #currentItem?: T;
    #itemsTaken: number;

    constructor(enumerator: IEnumerator<T>, itemsToTake: number)
    {
        super();
        this.#enumerator = enumerator;
        this.#itemsToTake = itemsToTake;
        this.#itemsTaken = 0;
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

        this.#itemsTaken++;
        return this.#enumerator.moveNext();
    }

    public peek(): Undefinable<T>
    {
        if (this.#itemsTaken == this.#itemsToTake)
        {
            return;
        }
        return this.#enumerator.peek();
    }

    public reset(): void
    {
        this.#enumerator.reset();
    }
}

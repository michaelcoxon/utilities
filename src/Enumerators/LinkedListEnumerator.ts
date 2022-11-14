import { IEnumerator } from './_types.js';
import { LinkedList } from "../Enumerables/index.js";
import EnumeratorBase from "./EnumeratorBase.js";
import Exception from '../Exceptions/Exception.js';

export default class LinkedListEnumerator<T> extends EnumeratorBase<T> implements IEnumerator<T>
{
    readonly #linkedList: LinkedList<T>;

    #currentIndex: number;

    constructor(linkedList: LinkedList<T>)
    {
        super();
        this.#linkedList = linkedList;
        this.#currentIndex = -1;
    }

    public get current(): T
    {
        return this.#linkedList.item(this.#currentIndex) as T;
    }

    public moveNext(): boolean
    {
        try
        {
            const item = this.peek();

            if (item === undefined)
            {
                return false;
            }

            this.#currentIndex++;
            return true;
        }
        catch
        {
            return false;
        }
    }

    public peek(): T
    {
        const item = this.#linkedList.item(this.#currentIndex + 1);

        if (item === undefined)
        {
            throw new Exception("End of enumerator");
        }

        return item;
    }

    public reset(): void
    {
        this.#currentIndex = -1;
    }
}
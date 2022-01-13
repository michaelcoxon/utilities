import { IEnumerator } from './_types';
import { LinkedList } from "../LinkedList";
import EnumeratorBase from "./EnumeratorBase";
import Exception from '../Exceptions/Exception';

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
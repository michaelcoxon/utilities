import { IEnumerator } from './_types.js';
import { KeyValuePair, Undefinable } from "../Types.js";
import ArrayEnumerator from "./ArrayEnumerator.js";
import EnumeratorBase from "./EnumeratorBase.js";
import { IDictionary } from '../Enumerables/_types.js';


export default class DictionaryEnumerator<TKey, TValue> extends EnumeratorBase<KeyValuePair<TKey, TValue>> implements IEnumerator<KeyValuePair<TKey, TValue>>
{
    readonly #dictionary: IDictionary<TKey, TValue>;
    readonly #keyEnumerator: IEnumerator<TKey>;

    constructor(dictionary: IDictionary<TKey, TValue>)
    {
        super();
        this.#dictionary = dictionary;
        this.#keyEnumerator = new ArrayEnumerator(dictionary.keys);
    }

    public get current(): KeyValuePair<TKey, TValue>
    {
        const key = this.#keyEnumerator.current;
        const value = this.#dictionary.itemByKey(key);

        return { key, value };
    }

    public moveNext(): boolean
    {
        return this.#keyEnumerator.moveNext();
    }

    public peek(): Undefinable<KeyValuePair<TKey, TValue>>
    {
        const key = this.#keyEnumerator.peek();
        if (key === undefined)
        {
            return;
        }
        const value = this.#dictionary.itemByKey(key);

        return { key, value };
    }

    public reset(): void
    {
        this.#keyEnumerator.reset();
    }
}

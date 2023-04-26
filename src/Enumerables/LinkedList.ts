import { Undefinable } from "../Types";
import AppendEnumerator from "../Enumerators/AppendEnumerator";
import LinkedListEnumerator from "../Enumerators/LinkedListEnumerator";
import { IEnumerable, IDictionary, IList, ICollection, LinkedListItem } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import  Dictionary  from './Dictionary';
import asEnumerable from './utils/asEnumerable';
import { EnumeratorEnumerable } from './EnumeratorEnumerable';
import asArray from './utils/asArray';
import List from './List';
import EnumerableBase from './utils/IEnumerable/EnumerableBase';


export default class LinkedList<T> extends EnumerableBase<T> implements ICollection<T>, IEnumerable<T>
{
    #root?: LinkedListItem<T>;
    #current?: LinkedListItem<T>;
    #count: number;

    constructor(iterable?: Iterable<T>)
    {
        super();

        this.#count = 0;

        if (iterable)
        {
            for (const item of asArray<T>(iterable))
            {
                this.add(item);
            }
        }
    }

    append(item: T): IEnumerable<T>
    {
        return this.concat(asEnumerable([item]));
    }

    concat(next: IEnumerable<T>): IEnumerable<T>
    {
        return new EnumeratorEnumerable(new AppendEnumerator(this.getEnumerator(), next.getEnumerator()));
    }

    prepend(item: T): IEnumerable<T>
    {
        return asEnumerable([item]).concat(this);
    }

    public get length(): number
    {
        return this.#count;
    }

    public get isReadOnly(): boolean
    {
        return false;
    }

    add(item: T): void
    {
        const listItem: LinkedListItem<T> = {
            value: item
        };

        if (this.#current === undefined)
        {
            this.#current = this.#root = listItem;
        }

        else
        {
            this.#current.next = listItem;
            this.#current = listItem;
        }

        this.#count++;
    }

    clear(): void
    {
        this.#current = this.#root = undefined;
        this.#count = 0;
    }

    contains(item: T): boolean
    {
        if (this.#root === undefined)
        {
            return false;
        }

        let result = false;

        this.traverse(this.#root, node => !(result = (node.value === item)));

        return result;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    copyTo(array: T[], arrayIndex: number): void
    {
        // TODO:   throw new Error("Error/Method not implemented.");
        throw new Error("copyTo Error/Method not implemented.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    remove(item: T): boolean
    {
        // TODO:   throw new Error("Error/Method not implemented.");
        throw new Error("remove Error/Method not implemented.");
    }

    forEach(callback: (value: T, index: number) => boolean | void): void
    {
        let index = 0;

        if (this.#root === undefined)
        {
            return;
        }

        return this.traverse(this.#root, node => callback(node.value, index++));
    }

    getEnumerator(): IEnumerator<T>
    {
        return new LinkedListEnumerator<T>(this);
    }

    item(index: number): Undefinable<T>
    {
        if (this.#root !== undefined)
        {
            if (index == 0)
            {
                return this.#root.value;
            }

            let count = 0;
            let result: Undefinable<T>;

            this.traverse(this.#root, node =>
            {
                if (count == index)
                {
                    result = node.value;
                }
                count++;
            });

            return result;
        }

        else
        {
            return undefined;
        }
    }

    ofType<N extends T>(ctor: new (...args: any[]) => N): IEnumerable<N>
    {
        return this.where((item) => item instanceof ctor).select((item) => item as N);
    }

    toArray(): T[]
    {
        const result: T[] = [];
        const en = this.getEnumerator();

        while (en.moveNext())
        {
            result.push(en.current);
        }

        return result;
    }

    toDictionary<TKey, TValue>(keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
    {
        return new Dictionary(this.toArray().map(i => ({ key: keySelector(i), value: valueSelector(i) })));
    }

    toList(): IList<T>
    {
        return new List(this);
    }

    /**
     * Traverse the collection, return false in the callback to break. return true or undefined to continue.
     * @param node
     * @param callback
     */
    private traverse(node: LinkedListItem<T>, callback: ((node: LinkedListItem<T>) => boolean | void)): void
    {
        const cont = callback(node);

        if (cont !== false && node.next !== undefined)
        {
            return this.traverse(node.next, callback);
        }
    }
}

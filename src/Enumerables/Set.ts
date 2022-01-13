import EnumeratorEnumerable from "./EnumeratorEnumerable";
import Collection from "./Collection";
import ArrayEnumerable from "./ArrayEnumerable";

import AppendEnumerator from '../Enumerators/AppendEnumerator';
import ArgumentException from '../Exceptions/ArgumentException';
import { Undefinable } from '../Types';
import { ISet, ICollection, IEnumerable, IDictionary, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';


// TODO: all of this needs to be optimised

export default class Set<T> extends Collection<T> implements ISet<T>, ICollection<T>, IEnumerable<T>
{
    constructor(enumerable?: IEnumerable<T>)
    {
        super(enumerable);
    }

    public get length(): number
    {
        return this.length;
    }

    public get isReadOnly(): boolean
    {
        return super.isReadOnly;
    }

    append(item: T): IEnumerable<T>
    {
        return this.concat(new ArrayEnumerable([item]));
    }

    concat(next: IEnumerable<T>): IEnumerable<T>
    {
        return new EnumeratorEnumerable(new AppendEnumerator(this.getEnumerator(), next.getEnumerator()));
    }

    prepend(item: T): IEnumerable<T>
    {
        return new ArrayEnumerable([item]).concat(this);
    }

    exceptWith(enumerable: IEnumerable<T>): void
    {
        const en = enumerable.getEnumerator();
        while (en.moveNext())
        {
            const item = en.current;
            if (this.contains(item))
            {
                this.remove(item);
            }
        }
    }

    intersectWith(enumerable: IEnumerable<T>): void
    {
        const array = enumerable.toArray();
        this.forEach((value, index) =>
        {
            if (array.indexOf(value) == -1)
            {
                this.remove(value);
            }
        });
    }

    isSubsetOf(enumerable: IEnumerable<T>): boolean
    {
        const array = enumerable.toArray();
        return this.toArray().every((value) => array.indexOf(value) > -1);
    }

    isSupersetOf(enumerable: IEnumerable<T>): boolean
    {
        const array = enumerable.toArray();
        return array.every((value) => this.contains(value));
    }

    overlaps(enumerable: IEnumerable<T>): boolean
    {
        const array = enumerable.toArray();
        return array.some((value) => this.contains(value));
    }

    setEquals(enumerable: IEnumerable<T>): boolean
    {
        return this.isSubsetOf(enumerable) && this.isSupersetOf(enumerable);
    }

    symmetricExceptWith(enumerable: IEnumerable<T>): void
    {
        // get the items that are only in both
        const intersect = new Set<T>(new Collection<T>(this.toArray()));
        intersect.intersectWith(enumerable);

        // union this with enumerable
        this.unionWith(enumerable);

        // remove the intersect from this
        this.exceptWith(intersect);
    }

    unionWith(enumerable: IEnumerable<T>): void
    {
        const en = enumerable.getEnumerator();

        while (en.moveNext())
        {
            const item = en.current;
            if (!this.contains(item))
            {
                this.add(item);
            }
        }
    }

    /**
     * Adds an item to the ICollection<T>.
     * @param item The object to add to the ICollection<T>.
     * @throws {ArgumentException} When the item is already in the collection.
     */
    add(item: T): void
    {
        if (!this.contains(item))
        {
            this.add(item);
        }
        else
        {
            throw new ArgumentException('item', 'item already in set');
        }
    }

    clear(): void
    {
        this.clear();
    }

    contains(item: T): boolean
    {
        return this.contains(item);
    }

    copyTo(array: T[], arrayIndex: number): void
    {
        this.copyTo(array, arrayIndex);
    }

    remove(item: T): boolean
    {
        return this.remove(item);
    }

    forEach(callback: (value: T, index: number, source: ISet<T>) => boolean | void): void
    {
        this.forEach(callback);
    }

    getEnumerator(): IEnumerator<T>
    {
        return this.getEnumerator();
    }

    item(index: number): Undefinable<T>
    {
        return this.item(index);
    }

    ofType<N extends T>(ctor: new (...args: any[]) => N): IEnumerable<N>
    {
        return this.ofType(ctor);
    }

    toArray(): T[]
    {
        return this.toArray();
    }

    toDictionary<TKey, TValue>(keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
    {
        return this.toDictionary(keySelector, valueSelector);
    }

    toList(): IList<T>
    {
        return this.toList();
    }
}
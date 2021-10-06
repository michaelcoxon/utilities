import DefaultComparers from "../Comparers/DefaultComparers";
import MapComparer from "../Comparers/MapComparer";
import ReverseComparer from "../Comparers/ReverseComparer";
import { ConstructorFor, IEnumerableOrArray, KeyValuePair, Predicate, Selector, Undefinable } from "../Types";

import AppendEnumerator from "../Enumerators/AppendEnumerator";
import ArrayEnumerator from "../Enumerators/ArrayEnumerator";

import DictionaryEnumerator from "../Enumerators/DictionaryEnumerator";
import RangeEnumerator from "../Enumerators/RangeEnumerator";
import SelectEnumerator from "../Enumerators/SelectEnumerator";
import SelectManyEnumerator from "../Enumerators/SelectManyEnumerator";
import SkipEnumerator from "../Enumerators/SkipEnumerator";
import TakeEnumerator from "../Enumerators/TakeEnumerator";
import WhereEnumerator from "../Enumerators/WhereEnumerator";
import AggregateEnumerator from "../Enumerators/AggregateEnumerator";
import LinkedListEnumerator from "../Enumerators/LinkedListEnumerator";
import getHash from '../Utilities/getHash';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import InvalidOperationException from '../Exceptions/InvalidOperationException';
import NullReferenceException from '../Exceptions/NullReferenceException';
import ArgumentException from '../Exceptions/ArgumentException';
import KeyAlreadyDefinedException from '../Exceptions/KeyAlreadyDefinedException';
import KeyNotFoundException from '../Exceptions/KeyNotFoundException';
import equivilentToByJSON from '../Utilities/equivilentToByJSON';
import { IComparer } from '../Comparers/_types';
import { IEnumerable, IEnumerableGroup, IDictionary, IList, ICollection } from './_types';
import { IEnumerator } from '../Enumerators/_types';

export class Enumerable
{
    public static range(start: number, count: number): IEnumerable<number>
    {
        return new RangeEnumerable(start, count);
    }

    public static empty<TElement>(): IEnumerable<TElement>
    {
        return new ArrayEnumerable<TElement>([]);
    }

    public static asArray<T>(array: T[]): T[];
    public static asArray<T>(enumerable: IEnumerable<T>): T[];
    public static asArray<T>(enumerableOrArray: IEnumerableOrArray<T>): T[];
    public static asArray<T>(enumerableOrArray: IEnumerableOrArray<T>): T[]
    {
        if (Array.isArray(enumerableOrArray))
        {
            // copy the array into this
            return [...enumerableOrArray];
        }

        else
        {
            return enumerableOrArray.toArray();
        }
    }

    public static asEnumerable<T>(array: T[]): IEnumerable<T>;
    public static asEnumerable<T>(enumerable: IEnumerable<T>): IEnumerable<T>;
    public static asEnumerable<T>(enumerableOrArray: IEnumerableOrArray<T>): IEnumerable<T>;
    public static asEnumerable<T>(enumerableOrArray: IEnumerableOrArray<T>): IEnumerable<T>
    {
        if (Array.isArray(enumerableOrArray))
        {
            // copy the array into this
            return new ArrayEnumerable([...enumerableOrArray]);
        }

        else
        {
            return enumerableOrArray;
        }
    }
}


abstract class EnumerableBase<T> implements IEnumerable<T>
{
    [Symbol.iterator](): Iterator<T>
    {
        return this.getEnumerator();
    }
    public abstract getEnumerator(): IEnumerator<T>;

    public append(item: T): IEnumerable<T>
    {
        return this.concat(new ArrayEnumerable([item]));
    }

    public concat(next: IEnumerable<T>): IEnumerable<T>
    {
        return new EnumeratorEnumerable(new AppendEnumerator(this.getEnumerator(), next.getEnumerator()));
    }

    public contains(item: T): boolean
    {
        let isContained = false;

        this.forEach(v =>
        {
            if (v === item)
            {
                isContained = true;
                return false;
            }
        });

        return isContained;
    }

    public forEach(callback: (value: T, index: number) => boolean | void): void
    {
        const en = this.getEnumerator();
        let count = 0;
        while (en.moveNext())
        {
            const value = callback(en.current, count);
            if (value === false)
            {
                break;
            }
            count++;
        }
    }

    public item(index: number): Undefinable<T>
    {
        const en = this.getEnumerator();
        let count = 0;
        while (count <= index && en.moveNext())
        {
            if (count === index)
            {
                return en.current;
            }
            count++;
        }

        return undefined;
    }

    public prepend(item: T): IEnumerable<T>
    {
        return new EnumeratorEnumerable(new AppendEnumerator(new ArrayEnumerator([item]), this.getEnumerator()));
    }

    public all(predicate: Predicate<T>): boolean
    {
        let output = true;
        const en = this.getEnumerator();

        while (output && en.moveNext())
        {
            output = predicate(en.current);
        }

        return output;
    }

    public any(predicate?: Predicate<T>): boolean
    {
        const en = this.getEnumerator();

        if (predicate !== undefined)
        {
            let output = false;

            while (!output && en.moveNext())
            {
                output = predicate(en.current);
            }

            return output;
        }
        else
        {
            return en.moveNext();
        }
    }

    public average(selector: Selector<T, number>): number
    {
        const sum = this.sum(selector);
        return sum / this.count();
    }

    public count(): number
    {
        let itemCount = 0;
        const en = this.getEnumerator();
        while (en.moveNext())
        {
            itemCount++;
        }

        return itemCount;
    }

    // USAGE: obj.Distinct(); or obj.Distinct(['key1'],['key2']);
    public distinct<R>(selector: (a: T) => R): IEnumerable<T>
    {
        const temp: Record<string, boolean> = {};

        return this.where((item) =>
        {
            const value = selector(item);
            let s_value: string;

            if (value instanceof Object)
            {
                s_value = getHash(value);
            }
            else
            {
                s_value = "" + value;
            }

            if (!temp[s_value])
            {
                temp[s_value] = true;
                return true;
            }

            return false;
        });
    }

    public first(): T;
    public first(predicate: Predicate<T>): T;
    public first(predicate?: Predicate<T>): T
    {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let enumerable: IEnumerable<T> = this;

        if (predicate !== undefined)
        {
            enumerable = new WhereEnumerable(enumerable, predicate);
        }

        const en = enumerable.getEnumerator();

        if (en.moveNext())
        {
            return en.current;
        }

        throw new Error("The collection is empty!");
    }

    public firstOrDefault(): T | null;
    public firstOrDefault(predicate: Predicate<T>): T | null;
    public firstOrDefault(predicate?: Predicate<T>): T | null
    {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let enumerable: IEnumerable<T> = this;

        if (predicate !== undefined)
        {
            enumerable = new WhereEnumerable(enumerable, predicate);
        }

        const en = enumerable.getEnumerator();

        if (en.moveNext())
        {
            return en.current;
        }

        return null;
    }

    public groupBy<TKey>(selector: Selector<T, TKey>): IEnumerable<IEnumerableGroup<T, TKey>>;
    public groupBy<TKey>(selector: Selector<T, TKey>, comparer: IComparer<TKey>): IEnumerable<IEnumerableGroup<T, TKey>>;
    public groupBy<TKey>(selector: Selector<T, TKey>, comparer: IComparer<TKey> = DefaultComparers.DefaultComparer): IEnumerable<IEnumerableGroup<T, TKey>>
    {
        const keySet = this.select(selector).distinct((k) => k).orderBy(k => k);
        return keySet.select((key) => new EnumerableGroup(this, key, selector, comparer));
    }
    /*
        public join<TInner, TKey, TResult>(
            inner: IEnumerable<TInner>,
            outerKeySelector: (o: T) => TKey,
            innerKeySelector: (i: TInner) => TKey,
            resultSelector: (o: T, i: TInner) => TResult): IEnumerable<TResult>
        {
            return this.select(o => ({ o, v: outerKeySelector(o) }))
                .selectMany(o => inner.select(i => ({ i, o: o.o, v: innerKeySelector(i) })).where(i => i.v == o.v))
                .select(j => resultSelector(j.o, j.i))
                ;
        }
    */
    public last(): T;
    public last(predicate: Predicate<T>): T;
    public last(predicate?: Predicate<T>): T
    {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let enumerable: IEnumerable<T> = this;

        if (predicate !== undefined)
        {
            enumerable = new WhereEnumerable(enumerable, predicate);
        }

        const en = enumerable.getEnumerator();

        if (en.moveNext())
        {
            let value = en.current;

            while (en.moveNext())
            {
                value = en.current;
            }

            return value;
        }
        else
        {
            if (predicate !== undefined)
            {
                throw new Error("There is no last item matching the predicate!");
            }
            else
            {
                throw new Error("The collection is empty!");
            }
        }
    }

    public lastOrDefault(): T | null;
    public lastOrDefault(predicate: Predicate<T>): T | null;
    public lastOrDefault(predicate?: Predicate<T>): T | null
    {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let enumerable: IEnumerable<T> = this;

        if (predicate !== undefined)
        {
            enumerable = new WhereEnumerable(enumerable, predicate);
        }

        const en = enumerable.getEnumerator();

        if (en.moveNext())
        {
            let value = en.current;

            while (en.moveNext())
            {
                value = en.current;
            }

            return value;
        }
        else
        {
            return null;
        }
    }

    public max(selector: Selector<T, number>): number
    {
        const values = this.select<number>(selector).toArray();
        return Math.max(...values);
    }

    public min(selector: Selector<T, number>): number
    {
        const values = this.select<number>(selector).toArray();
        return Math.min(...values);
    }

    public ofType<N extends T>(ctor: ConstructorFor<N>): IEnumerable<N>
    {
        return this.where((item) => item instanceof ctor).select((item) => item as N);
    }

    public orderBy<R>(selector: (a: T) => R, comparer?: IComparer<R>): IEnumerable<T>
    {
        return this.internalOrderBy(selector, comparer || DefaultComparers.DefaultComparer);
    }

    public orderByDescending<R>(selector: (a: T) => R, comparer?: IComparer<R>): IEnumerable<T>
    {
        return this.internalOrderBy(selector, new ReverseComparer(comparer || DefaultComparers.DefaultComparer));
    }

    public select<TOut>(selector: Selector<T, TOut>): IEnumerable<TOut>
    {
        return new SelectEnumerable<T, TOut>(this, selector);
    }

    public selectMany<TOut>(selector: Selector<T, IEnumerable<TOut>>): IEnumerable<TOut>
    {
        return new SelectManyEnumerable<T, TOut>(this, selector);
    }

    public single(): T;
    public single(predicate: Predicate<T>): T;
    public single(predicate?: Predicate<T>): T
    {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let enumerable: IEnumerable<T> = this;

        if (predicate !== undefined)
        {
            enumerable = new WhereEnumerable(enumerable, predicate);
        }

        const en = enumerable.getEnumerator();

        let returnValue: Undefinable<T>;

        while (en.moveNext())
        {
            if (!isUndefinedOrNull(returnValue))
            {
                throw new InvalidOperationException("More than one match in the collection!");
            }
            returnValue = en.current;
        }

        if (isUndefinedOrNull(returnValue))
        {
            throw new NullReferenceException("The result is undefined!");
        }

        return returnValue;
    }

    public singleOrDefault(): T | null;
    public singleOrDefault(predicate: Predicate<T>): T | null;
    public singleOrDefault(predicate?: Predicate<T>): T | null
    {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let enumerable: IEnumerable<T> = this;

        if (predicate !== undefined)
        {
            enumerable = new WhereEnumerable(enumerable, predicate);
        }

        const en = enumerable.getEnumerator();

        let returnValue: Undefinable<T>;

        while (en.moveNext())
        {
            if (!isUndefinedOrNull(returnValue))
            {
                // TODO: should this throw here?  throw new InvalidOperationException("More than one match in the collection!");
                return null;
            }
            returnValue = en.current;
        }

        if (isUndefinedOrNull(returnValue))
        {
            return null;
        }

        return returnValue;
    }

    public skip(count: number): IEnumerable<T>
    {
        return new SkipEnumerable(this, count);
    }

    public split(predicate: Predicate<T>): { pTrue: IEnumerable<T>, pFalse: IEnumerable<T>; }
    {
        return {
            pTrue: this.where(i => predicate(i)),
            pFalse: this.where(i => !predicate(i))
        };
    }

    public sum(selector: Selector<T, number>): number
    {
        return this.select<number>((item) => selector(item))
            .toArray()
            .reduce((a, c) => a + c, 0);
    }

    public take(count: number): IEnumerable<T>
    {
        return new TakeEnumerable(this, count);
    }

    public where(predicate: Predicate<T>): IEnumerable<T>
    {
        return new WhereEnumerable(this, predicate);
    }

    public toArray(): T[]
    {
        const array: T[] = [];
        this.forEach(i =>
        {
            array.push(i);
        });
        return array;
    }

    public toDictionary<TKey, TValue>(keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
    {
        const dictionary = new Dictionary<TKey, TValue>();
        this.forEach(i =>
        {
            dictionary.addKeyValue(keySelector(i), valueSelector(i));
        });
        return dictionary;
    }

    public toList(): IList<T>
    {
        const list = new List<T>();
        this.forEach(i =>
        {
            list.add(i);
        });
        return list;
    }

    private internalOrderBy<R>(selector: (a: T) => R, comparer: IComparer<R>): IEnumerable<T>
    {
        // HACK: this could be better...
        const list = this.toList();
        const mapComparer = new MapComparer(selector, comparer);
        list.sort(mapComparer);
        return list;
    }
}

export class AggregateEnumerable<T, TReturn> extends EnumerableBase<TReturn>
{
    readonly #enumerable: IEnumerable<T>;
    readonly #aggregateFunction: (acumulate: TReturn, current: T) => TReturn;
    readonly #initialValue: TReturn;

    constructor(enumerable: IEnumerable<T>, aggregateFunction: (acumulate: TReturn, current: T) => TReturn, initialValue: TReturn)
    {
        super();
        this.#enumerable = enumerable;
        this.#aggregateFunction = aggregateFunction;
        this.#initialValue = initialValue;
    }

    public getEnumerator(): IEnumerator<TReturn>
    {
        return new AggregateEnumerator(this.#enumerable.getEnumerator(), this.#aggregateFunction, this.#initialValue);
    }
}

export class ArrayEnumerable<T> extends EnumerableBase<T>
{
    protected _array: T[];

    constructor(array: T[])
    {
        super();
        this._array = array;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new ArrayEnumerator<T>(this._array);
    }
}

export class Collection<T> extends ArrayEnumerable<T> implements ICollection<T>, IEnumerable<T>
{
    constructor(enumerableOrArray?: IEnumerableOrArray<T>)
    {
        if (enumerableOrArray === undefined)
        {
            super([]);
        }

        else
        {
            super(Enumerable.asArray<T>(enumerableOrArray));
        }
    }

    public get isReadOnly(): boolean
    {
        return false;
    }

    public add(obj: T): void
    {
        this._array.push(obj);
    }

    public get length(): number
    {
        return this._array.length;
    }

    public clear(): void
    {
        this._array.length = 0;
    }

    public copyTo(array: T[], arrayIndex: number): void
    {
        if (this.length > (array.length - arrayIndex))
        {
            throw new ArgumentException("array", "Array is not big enough to store the collection");
        }
        array.splice(arrayIndex, this.length, ...this._array);
    }

    public remove(item: T): boolean
    {
        const index = this._array.indexOf(item);

        if (index != undefined)
        {
            this._array.splice(index, 1);
            return true;
        }
        else
        {
            return false;
        }
    }
}

export class Dictionary<TKey, TValue> extends EnumerableBase<KeyValuePair<TKey, TValue>> implements IDictionary<TKey, TValue>, ICollection<KeyValuePair<TKey, TValue>>, IEnumerable<KeyValuePair<TKey, TValue>>
{
    #hashtable: { [hash: string]: KeyValuePair<TKey, TValue>; };

    public readonly isReadOnly: boolean = false;

    // constructor
    constructor(enumerableOrArray?: IEnumerableOrArray<KeyValuePair<TKey, TValue>>)
    {
        super();
        this.#hashtable = {};

        if (enumerableOrArray)
        {
            const items = Enumerable.asArray<KeyValuePair<TKey, TValue>>(enumerableOrArray);
            for (const item of items)
            {
                this.add(item);
            }
        }
    }

    public get length(): number
    {
        return Object.keys(this.#hashtable).length;
    }

    public get keys(): TKey[]
    {
        return Object.keys(this.#hashtable).map(key => this.#hashtable[key].key);
    }

    public get values(): TValue[]
    {
        return Object.keys(this.#hashtable).map(key => this.#hashtable[key].value);
    }

    public add(keyValuePair: KeyValuePair<TKey, TValue>): void
    {
        const hash = getHash(keyValuePair.key);

        if (this.#hashtable[getHash(keyValuePair.key)] !== undefined)
        {
            throw new KeyAlreadyDefinedException(keyValuePair.key);
        }

        this.#hashtable[hash] = keyValuePair;
    }

    public addKeyValue(key: TKey, value: TValue): void
    {
        this.add({ key: key, value: value });
    }

    public itemByKey(key: TKey): TValue
    {
        const hash = getHash(key);
        if (this.#hashtable[hash] === undefined)
        {
            throw new KeyNotFoundException(key);
        }
        return this.#hashtable[hash].value;
    }

    public containsKey(key: TKey): boolean
    {
        const hash = getHash(key);
        return this.#hashtable[hash] !== undefined;
    }

    public removeByKey(key: TKey): boolean
    {
        const hash = getHash(key);

        if (this.#hashtable[hash] === undefined)
        {
            return false;
        }

        delete this.#hashtable[hash];

        return true;
    }

    public tryGetValue(key: TKey): { value?: TValue; success: boolean; }
    {
        try
        {
            return {
                value: this.itemByKey(key),
                success: true
            };
        }
        catch {
            return { success: false };
        }
    }

    public clear(): void
    {
        this.#hashtable = {};
    }

    public remove(item: KeyValuePair<TKey, TValue>): boolean
    {
        const hash = getHash(item.key);
        if (this.#hashtable[hash] === undefined || this.#hashtable[hash].value !== item.value)
        {
            return false;
        }

        delete this.#hashtable[hash];

        return true;
    }

    public contains(item: KeyValuePair<TKey, TValue>): boolean
    {
        const hash = getHash(item.key);
        if (this.#hashtable[hash] === undefined || this.#hashtable[hash].value !== item.value)
        {
            return false;
        }

        return true;
    }

    public copyTo(array: KeyValuePair<TKey, TValue>[], arrayIndex: number): void
    {
        array.splice(arrayIndex, this.length, ...this.toArray());
    }

    public getEnumerator(): IEnumerator<KeyValuePair<TKey, TValue>>
    {
        return new DictionaryEnumerator(this);
    }
}

export class EnumeratorEnumerable<T> extends EnumerableBase<T>
{
    readonly #enumerator: IEnumerator<T>;

    constructor(enumerator: IEnumerator<T>)
    {
        super();
        this.#enumerator = enumerator;
    }


    getEnumerator(): IEnumerator<T>
    {
        return this.#enumerator;
    }
}

interface LinkedListItem<T>
{
    value: T;
    next?: LinkedListItem<T>;
}

export class LinkedList<T> extends EnumerableBase<T> implements ICollection<T>, IEnumerable<T>
{
    #root?: LinkedListItem<T>;
    #current?: LinkedListItem<T>;
    #count: number;

    constructor(enumerableOrArray?: IEnumerableOrArray<T>)
    {
        super();

        this.#count = 0;

        if (enumerableOrArray)
        {
            for (const item of Enumerable.asArray<T>(enumerableOrArray))
            {
                this.add(item);
            }
        }
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
        // TODO:   throw new Error("Method not implemented.");
        throw new Error("Method not implemented.");
    }

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     remove(item: T): boolean
    {
        // TODO:   throw new Error("Method not implemented.");
        throw new Error("Method not implemented.");
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


export class List<T> extends Collection<T> implements IList<T>, ICollection<T>, IEnumerable<T>
{
    public addRange(array: T[]): void;
    public addRange(enumerable: IEnumerable<T>): void;
    public addRange(enumerableOrArray: IEnumerableOrArray<T>): void
    {
        const array = Enumerable.asArray<T>(enumerableOrArray);
        this._array = this._array.concat(array);
    }

    public find(obj: T, isEquivilent = false): T | undefined
    {
        if (isEquivilent)
        {
            for (const item of this._array)
            {
                if (equivilentToByJSON(item, obj))
                {
                    return item;
                }
            }
        }
        else
        {
            const index = this.indexOf(obj);
            if (index !== undefined)
            {
                return this.item(index);
            }
            else
            {
                return undefined;
            }
        }
    }

    public indexOf(value: T, isEquivilent = false): number | undefined
    {
        if (isEquivilent)
        {
            let index: number | undefined;

            this.forEach((item, i) =>
            {
                if (equivilentToByJSON(item, value))
                {
                    index = i;
                    return false;
                }
            });

            return index;
        }
        else
        {
            const index = this._array.indexOf(value);
            if (index == -1)
            {
                return undefined;
            }
            return index;
        }
    }

    public insert(obj: T, index: number): void
    {
        this._array.splice(index, 0, obj);
    }

    public prepend(obj: T): void;
    public prepend(obj: T): IEnumerable<T>;
    public prepend(obj: T): IEnumerable<T> | void
    {
        this.insert(obj, 0);
        return this;
    }

    public prependRange(array: T[]): void;
    public prependRange(enumerable: Collection<T>): void;
    public prependRange(enumerableOrArray: IEnumerableOrArray<T>): void
    {
        const array = Enumerable.asArray<T>(enumerableOrArray);
        this._array.splice(0, 0, ...array);
    }

    public removeAt(index: number): void
    {
        this._array.splice(index, 1);
    }

    public sort(comparer: IComparer<T> = DefaultComparers.DefaultComparer): void
    {
        this._array.sort((a, b) => comparer.compare(a, b));
    }
}

class EnumerableGroup<T, TKey> extends EnumerableBase<T> implements IEnumerableGroup<T, TKey>
{
    readonly #key: TKey;
    readonly #enumerable: IEnumerable<T>;

    constructor(parentEnumerable: IEnumerable<T>, key: TKey, keySelector: Selector<T, TKey>, keyComparer: IComparer<TKey>)
    {
        super();
        this.#enumerable = parentEnumerable.where(item => keyComparer.equals(keySelector(item), key));
        this.#key = key;
    }

    public get key(): TKey
    {
        return this.#key;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return this.#enumerable.getEnumerator();
    }
}

class RangeEnumerable extends EnumerableBase<number>
{
    readonly #start: number;
    readonly #count: number;

    constructor(start: number, count: number)
    {
        super();
        this.#start = start;
        this.#count = count;
    }

    public getEnumerator(): IEnumerator<number>
    {
        return new RangeEnumerator(this.#start, this.#count);
    }
}

class SelectEnumerable<T, TReturn> extends EnumerableBase<TReturn>
{
    readonly #enumerable: IEnumerable<T>;
    readonly #selector: Selector<T, TReturn>;

    constructor(enumerable: IEnumerable<T>, selector: Selector<T, TReturn>)
    {
        super();
        this.#enumerable = enumerable;
        this.#selector = selector;
    }

    public getEnumerator(): IEnumerator<TReturn>
    {
        return new SelectEnumerator<T, TReturn>(this.#enumerable.getEnumerator(), this.#selector);
    }
}

class SelectManyEnumerable<T, TReturn> extends EnumerableBase<TReturn>
{
    readonly #enumerable: IEnumerable<T>;
    readonly #selector: Selector<T, IEnumerable<TReturn>>;

    constructor(enumerable: IEnumerable<T>, selector: Selector<T, IEnumerable<TReturn>>)
    {
        super();
        this.#enumerable = enumerable;
        this.#selector = selector;
    }

    public getEnumerator(): IEnumerator<TReturn>
    {
        return new SelectManyEnumerator<T, TReturn>(this.#enumerable.getEnumerator(), this.#selector);
    }
}

class SkipEnumerable<T> extends EnumerableBase<T>
{
    readonly #enumerable: IEnumerable<T>;
    #itemsToSkip: number;

    constructor(enumerable: IEnumerable<T>, itemsToSkip: number)
    {
        super();
        this.#enumerable = enumerable;
        this.#itemsToSkip = itemsToSkip;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new SkipEnumerator<T>(this.#enumerable.getEnumerator(), this.#itemsToSkip);
    }
}

class TakeEnumerable<T> extends EnumerableBase<T>
{
    readonly #enumerable: IEnumerable<T>;
    #itemsToTake: number;

    constructor(enumerable: IEnumerable<T>, itemsToTake: number)
    {
        super();
        this.#enumerable = enumerable;
        this.#itemsToTake = itemsToTake;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new TakeEnumerator<T>(this.#enumerable.getEnumerator(), this.#itemsToTake);
    }
}

class WhereEnumerable<T> extends EnumerableBase<T>
{
    readonly #enumerable: IEnumerable<T>;
    readonly #predicate: Predicate<T>;

    constructor(enumerable: IEnumerable<T>, predicate: Predicate<T>)
    {
        super();
        this.#enumerable = enumerable;
        this.#predicate = predicate;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return new WhereEnumerator<T>(this.#enumerable.getEnumerator(), this.#predicate);
    }
}
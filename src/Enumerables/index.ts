export * from './_types';

import DefaultComparers from "../Comparers/DefaultComparers";
import MapComparer from "../Comparers/MapComparer";
import ReverseComparer from "../Comparers/ReverseComparer";
import { ConstructorFor, KeyValuePair, Predicate, Selector, Undefinable } from "../Types";

import AppendEnumerator from "../Enumerators/AppendEnumerator";
import ArrayEnumerator from "../Enumerators/ArrayEnumerator";

import DictionaryEnumerator from "../Enumerators/DictionaryEnumerator";
import RangeEnumerator from "../Enumerators/RangeEnumerator";
import SelectEnumerator from "../Enumerators/SelectEnumerator";
import SelectManyEnumerator from "../Enumerators/SelectManyEnumerator";
import SkipEnumerator from "../Enumerators/SkipEnumerator";
import TakeEnumerator from "../Enumerators/TakeEnumerator";
import WhereEnumerator from "../Enumerators/WhereEnumerator";
import LinkedListEnumerator from "../Enumerators/LinkedListEnumerator";
import getHash from '../Utilities/getHash';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import KeyAlreadyDefinedException from '../Exceptions/KeyAlreadyDefinedException';
import KeyNotFoundException from '../Exceptions/KeyNotFoundException';
import equivilentToByJSON from '../Utilities/equivilentToByJSON';

import { IComparer } from '../Comparers/_types';
import { IEnumerable, IEnumerableGroup, IDictionary, IList, ICollection, ISet, LinkedListItem, IEnumerableOrArray } from './_types';
import { IEnumerator } from '../Enumerators/_types';

import contains from './utils/IEnumerable/contains';
import forEach from './utils/IEnumerable/forEach';
import item from './utils/IEnumerable/item';
import all from './utils/IEnumerable/all';
import any from './utils/IEnumerable/any';
import distinct from './utils/IEnumerable/distinct';
import count from './utils/IEnumerable/count';
import average from './utils/IEnumerable/average';
import first from './utils/IEnumerable/first';
import firstOrDefault from './utils/IEnumerable/firstOrDefault';
import last from './utils/IEnumerable/last';
import lastOrDefault from './utils/IEnumerable/lastOrDefault';
import single from './utils/IEnumerable/single';
import singleOrDefault from './utils/IEnumerable/singleOrDefault';
import max from './utils/IEnumerable/max';
import min from './utils/IEnumerable/min';
import ofType from './utils/IEnumerable/ofType';
import asArray from './utils/asArray';
import remove from './utils/Collection/remove';
import copyTo from './utils/Collection/copyTo';
import { InvalidOperationException, NotImplementedException } from '../Exceptions';
import whereArray from '../Arrays/utils/where';
import sum from './utils/IEnumerable/sum';
import toArray from './utils/IEnumerable/toArray';

export class Enumerable
{
    public static range(start: number, count: number): IEnumerable<number>
    {
        //return new EnumeratorEnumerable(new RangeEnumerator(start, count));
        return range(start, count);
    }

    public static empty<TElement>(): IEnumerable<TElement>
    {
        return empty();
    }

    public static asArray<T>(enumerableOrArray: IEnumerableOrArray<T>): T[]
    {
        return asArray(enumerableOrArray);
    }

    public static asEnumerable<T>(enumerableOrArray: IEnumerableOrArray<T>): IEnumerable<T>
    {
        return asEnumerable(enumerableOrArray);
    }
}

export abstract class EnumerableBase<T> implements IEnumerable<T>
{
    [Symbol.iterator](): Iterator<T>
    {
        return this.getEnumerator();
    }

    public abstract getEnumerator(): IEnumerator<T>;

    public append(item: T): IEnumerable<T>
    {
        return concat(this, asEnumerable([item]));
    }

    public concat(next: IEnumerable<T>): IEnumerable<T>
    {
        return concat(this, next);
    }

    public prepend(item: T): IEnumerable<T>
    {
        return prepend(this, item);
    }

    public contains(item: T): boolean
    {
        return contains(this, item);
    }

    public forEach(callback: (value: T, index: number) => boolean | void): void
    {
        return forEach(this, callback);
    }

    public item(index: number): Undefinable<T>
    {
        return item(this, index);
    }

    public all(predicate: Predicate<T>): boolean
    {
        return all(this, predicate);
    }

    public any(predicate?: Predicate<T>): boolean
    {
        return any(this, predicate);
    }

    public average(selector: Selector<T, number>): number
    {
        return average(this, selector);
    }

    public count(): number
    {
        return count(this);
    }

    public distinct<R>(selector: (a: T) => R): IEnumerable<T>
    {
        return distinct(this, selector);
    }

    public first(predicate?: Predicate<T>): T
    {
        return first(this, predicate);
    }

    public firstOrDefault(predicate?: Predicate<T>): T | null
    {
        return firstOrDefault(this, predicate);
    }

    public groupBy<TKey>(selector: Selector<T, TKey>, comparer: IComparer<TKey> = DefaultComparers.DefaultComparer): IEnumerable<IEnumerableGroup<T, TKey>>
    {
        return groupBy(this, selector, comparer);
    }

    public join<TInner, TKey, TResult>(
        inner: IEnumerable<TInner>,
        outerKeySelector: (outer: T) => TKey,
        innerKeySelector: (inner: TInner) => TKey,
        resultSelector: (outer: T, inner: TInner) => TResult): IEnumerable<TResult>
    {
        return join(this, inner, outerKeySelector, innerKeySelector, resultSelector);
    }

    public last(predicate?: Predicate<T>): T
    {
        return last(this, predicate);
    }

    public lastOrDefault(predicate?: Predicate<T>): T | null
    {
        return lastOrDefault(this, predicate);
    }

    public max(selector: Selector<T, number>): number
    {
        return max(this, selector);
    }

    public min(selector: Selector<T, number>): number
    {
        return min(this, selector);
    }

    public ofType<N extends T>(ctor: ConstructorFor<N>): IEnumerable<N>
    {
        return ofType(this, ctor);
    }

    public orderBy<R>(selector: (a: T) => R, comparer?: IComparer<R>): IEnumerable<T>
    {
        return orderBy(this, selector, comparer || DefaultComparers.DefaultComparer);
    }

    public orderByDescending<R>(selector: (a: T) => R, comparer?: IComparer<R>): IEnumerable<T>
    {
        return orderBy(this, selector, new ReverseComparer(comparer || DefaultComparers.DefaultComparer));
    }

    public select<TOut>(selector: Selector<T, TOut>): IEnumerable<TOut>
    {
        return select(this, selector);
    }

    public selectMany<TOut>(selector: Selector<T, IEnumerable<TOut>>): IEnumerable<TOut>
    {
        return selectMany(this, selector);
    }

    public single(predicate?: Predicate<T>): T
    {
        return single(this, predicate);
    }

    public singleOrDefault(predicate?: Predicate<T>): T | null
    {
        return singleOrDefault(this, predicate);
    }

    public skip(count: number): IEnumerable<T>
    {
        return skip(this, count);
    }

    public split(predicate: Predicate<T>): { pTrue: IEnumerable<T>, pFalse: IEnumerable<T>; }
    {
        return split(this, predicate);
    }

    public sum(selector: Selector<T, number>): number
    {
        return sum(this, selector);
    }

    public take(count: number): IEnumerable<T>
    {
        return take(this, count);
    }

    public where(predicate: Predicate<T>): IEnumerable<T>
    {
        return whereEnumerable(this, predicate);
    }

    public toArray(): T[]
    {
        return toArray(this);
    }

    public toDictionary<TKey, TValue>(keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
    {
        return toDictionary(this, keySelector, valueSelector);
    }

    public toList(): IList<T>
    {
        return toList(this);
    }
}

function asEnumerable<T>(enumerableOrArray: IEnumerableOrArray<T>): IEnumerable<T>
{
    if (Array.isArray(enumerableOrArray))
    {
        return new ArrayEnumerable([...enumerableOrArray]);
    }
    else
    {
        return enumerableOrArray;
    }
}

function join<TOuter, TInner, TKey, TResult>(
    outer: IEnumerable<TOuter>,
    inner: IEnumerable<TInner>,
    outerKeySelector: Selector<TOuter, TKey>,
    innerKeySelector: Selector<TInner, TKey>,
    resultSelector: (outer: TOuter, inner: TInner) => TResult): IEnumerable<TResult>
{
    function getResults(matches: IEnumerableGroup<TInner, TKey>, resultSelector: (outer: TOuter, inner: TInner) => TResult, o: TOuter): IEnumerable<TResult>
    {
        return matches.select((item) => resultSelector(o, item));
    }

    // TODO: might be able to drop the toDictionary as the refs should all be the same in memory
    const innerGrouped = inner.groupBy(innerKeySelector).toDictionary(i => i.key, i => i);

    let result: IEnumerable<TResult> = empty();

    for (const o of outer)
    {
        const oKey = outerKeySelector(o);
        const matches = innerGrouped.itemByKey(oKey);
        const temp = getResults(matches, resultSelector, o);
        result = result.concat(temp);
    }

    return result;
}


function toDictionary<T, TKey, TValue>(enumerable: IEnumerable<T>, keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
{
    const dictionary = new Dictionary<TKey, TValue>();
    enumerable.forEach(i =>
    {
        dictionary.addKeyValue(keySelector(i), valueSelector(i));
    });
    return dictionary;
}

function concat<T>(enumerable: IEnumerable<T>, next: IEnumerable<T>): IEnumerable<T>
{
    return combine(enumerable, next);
}

function prepend<T>(enumerable: IEnumerable<T>, item: T): IEnumerable<T>
{
    return combine(Enumerable.asEnumerable([item]), enumerable);
}

function combine<T>(first: IEnumerable<T>, ...more: IEnumerable<T>[]): IEnumerable<T>
{
    if (isUndefinedOrNull(more) || more.length == 0)
    {
        return first;
    }
    else if (more.length == 1)
    {
        return new EnumeratorEnumerable(new AppendEnumerator(first.getEnumerator(), more[0].getEnumerator()));
    }
    else
    {
        const firstItem = more.shift() as IEnumerable<T>; // we know it is not empty cause the above checks passed
        return combine(new EnumeratorEnumerable(new AppendEnumerator(first.getEnumerator(), firstItem.getEnumerator())), ...more);
    }
}

function orderBy<T, R>(enumerable: IEnumerable<T>, selector: (a: T) => R, comparer: IComparer<R>): IEnumerable<T>
{
    // HACK: this could be better...
    const list = toList(enumerable);
    const mapComparer = new MapComparer(selector, comparer);
    list.sort(mapComparer);
    return list;
}

function select<T, TOut>(enumerable: IEnumerable<T>, selector: Selector<T, TOut>): IEnumerable<TOut>
{
    return new EnumeratorEnumerable(new SelectEnumerator(enumerable.getEnumerator(), selector));
}

function selectMany<T, TOut>(enumerable: IEnumerable<T>, selector: Selector<T, IEnumerable<TOut>>): IEnumerable<TOut>
{
    return new EnumeratorEnumerable(new SelectManyEnumerator(enumerable.getEnumerator(), selector));
}

function skip<T>(enumerable: IEnumerable<T>, count: number): IEnumerable<T>
{
    return new EnumeratorEnumerable(new SkipEnumerator<T>(enumerable.getEnumerator(), count));
}

function split<T>(enumerable: IEnumerable<T>, predicate: Predicate<T>): { pTrue: IEnumerable<T>, pFalse: IEnumerable<T>; }
{
    return {
        pTrue: whereEnumerable(enumerable, i => predicate(i)),
        pFalse: whereEnumerable(enumerable, i => !predicate(i))
    };
}

function take<T>(enumerable: IEnumerable<T>, count: number): IEnumerable<T>
{
    return new EnumeratorEnumerable(new TakeEnumerator<T>(enumerable.getEnumerator(), count));
}

function whereEnumerable<T>(enumerable: IEnumerable<T>, predicate: Predicate<T>): IEnumerable<T>
{
    return new EnumeratorEnumerable(new WhereEnumerator(enumerable.getEnumerator(), predicate));
}

export class ArrayEnumerable<T> implements IEnumerable<T>
{
    [Symbol.iterator](): Iterator<T, unknown, undefined>
    {
        return this._array[Symbol.iterator]();
    }

    protected _array: T[];

    constructor(array: T[])
    {
        this._array = array;
    }

    /**@inheritDoc */
    all(predicate: Predicate<T>): boolean
    {
        return all(this._array, predicate);
    }
    /**@inheritDoc */
    append(item: T): IEnumerable<T>
    {
        return new ArrayEnumerable([...this._array, item]);
    }
    /**@inheritDoc */
    any(predicate?: Predicate<T> | undefined): boolean
    {
        return any(this._array, predicate);
    }
    /**@inheritDoc */
    average(selector: Selector<T, number>): number
    {
        return average(new ArrayEnumerable(this._array), selector);
    }
    /**@inheritDoc */
    concat(next: IEnumerable<T>): IEnumerable<T>
    {
        return new ArrayEnumerable([...this._array, ...next]);
    }
    /**@inheritDoc */
    contains(item: T): boolean
    {
        return contains(this._array, item);
    }
    /**@inheritDoc */
    count(): number
    {
        return count(this._array);
    }
    /**@inheritDoc */
    distinct<R>(selector: Selector<T, R>): IEnumerable<T>
    {
        return distinct(new ArrayEnumerable(this._array), selector);
    }
    /**@inheritDoc */
    first(predicate?: Predicate<T>): T
    {
        const result = this.firstOrDefault(predicate);
        if (isUndefinedOrNull(result))
        {
            throw new InvalidOperationException('There are no results');
        }
        return result;
    }

    /**@inheritDoc */
    firstOrDefault(predicate?: Predicate<T>): T | null
    {
        const result = isUndefinedOrNull(predicate)
            ? this._array[0]
            : this._array.find(predicate)
            ;

        return isUndefinedOrNull(result)
            ? null
            : result;
    }
    /**@inheritDoc */
    forEach(callback: (value: T, index: number) => boolean | void): void
    {
        return forEach(this._array, callback);
    }
    /**@inheritDoc */
    getEnumerator(): IEnumerator<T>
    {
        return new ArrayEnumerator(this._array);
    }
    /**@inheritDoc */
    groupBy<TKey>(keySelector: Selector<T, TKey>, comparer: IComparer<TKey> = DefaultComparers.DefaultComparer): IEnumerable<IEnumerableGroup<T, TKey>>
    {
        const keySet = this.select(keySelector).distinct((k) => k).orderBy(k => k).toArray();
        const result = keySet.reduce(
            (group, key) =>
            {
                const en = this.where(item => comparer.equals(keySelector(item), key));
                en['key'] = key;
                group.push(en as IEnumerableGroup<T, TKey>);

                return group;
            },
            new Array<IEnumerableGroup<T, TKey>>()
        );

        return new ArrayEnumerable(result);
    }
    /**@inheritDoc */
    item(index: number): Undefinable<T>
    {
        return this._array[index];
    }
    /**@inheritDoc */
    last(predicate?: Predicate<T>): T
    {
        const result = this.lastOrDefault(predicate);
        if (isUndefinedOrNull(result))
        {
            throw new InvalidOperationException('There are no results');
        }
        return result;
    }
    /**@inheritDoc */
    lastOrDefault(predicate?: Predicate<T>): T | null
    {
        if (isUndefinedOrNull(predicate))
        {
            return this._array[this._array.length - 1] || null;
        }
        const set = this._array.filter(predicate);
        const result = set[set.length - 1];

        return isUndefinedOrNull(result)
            ? null
            : result;
    }
    /**@inheritDoc */
    max(selector: Selector<T, number>): number
    {
        return Math.max(...this._array.map(selector));
    }
    /**@inheritDoc */
    min(selector: Selector<T, number>): number
    {
        return Math.min(...this._array.map(selector));
    }
    /**@inheritDoc */
    ofType<N extends T>(ctor: ConstructorFor<N>): IEnumerable<N>
    {
        return ofType(new ArrayEnumerable(this._array), ctor);
    }
    /**@inheritDoc */
    orderBy<R>(selector: Selector<T, R>, comparer?: IComparer<R> | undefined): IEnumerable<T>
    {
        return this.internalOrderBy(selector, comparer || DefaultComparers.DefaultComparer);
    }
    /**@inheritDoc */
    orderByDescending<R>(selector: Selector<T, R>, comparer?: IComparer<R> | undefined): IEnumerable<T>
    {
        return this.internalOrderBy(selector, new ReverseComparer(comparer || DefaultComparers.DefaultComparer));
    }

    private internalOrderBy<R>(selector: (a: T) => R, comparer: IComparer<R>): IEnumerable<T>
    {
        // HACK: this could be better...
        const array = this.toArray();
        const mapComparer = new MapComparer(selector, comparer);
        array.sort((a, b) => mapComparer.compare(a, b));
        return new ArrayEnumerable(array);
    }

    /**@inheritDoc */
    prepend(item: T): IEnumerable<T>
    {
        return new ArrayEnumerable([item, ...this._array]);
    }
    /**@inheritDoc */
    select<TOut>(selector: Selector<T, TOut>): IEnumerable<TOut>
    {
        return new ArrayEnumerable(this._array.map(selector));
    }
    /**@inheritDoc */
    selectMany<TOut>(selector: Selector<T, IEnumerable<TOut>>): IEnumerable<TOut>
    {
        return new ArrayEnumerable(this._array.reduce(
            (results: TOut[], t: T) => [...results, ...selector(t)],
            []
        ));
    }
    /**@inheritDoc */
    single(predicate?: Predicate<T>): T
    {
        const result = this.singleOrDefault(predicate);

        if (isUndefinedOrNull(result))
        {
            throw new InvalidOperationException('There is no result.');
        }

        return result;
    }
    /**@inheritDoc */
    singleOrDefault(predicate?: Predicate<T>): T | null
    {
        const result = isUndefinedOrNull(predicate)
            ? this._array
            : this._array.filter(predicate)
            ;

        if (result.length > 1)
        {
            throw new InvalidOperationException('More than one match in the collection.');
        }
        if (result.length !== 1)
        {
            return null;
        }

        return result[0];
    }
    /**@inheritDoc */
    skip(count: number): IEnumerable<T>
    {
        return new ArrayEnumerable(this._array.slice(count));
    }
    /**@inheritDoc */
    split(predicate: Predicate<T>): { pTrue: IEnumerable<T>; pFalse: IEnumerable<T>; }
    {
        return {
            pTrue: this.where(i => predicate(i)),
            pFalse: this.where(i => !predicate(i))
        };
    }
    /**@inheritDoc */
    sum(selector: Selector<T, number>): number
    {
        return this._array
            .map((item) => selector(item))
            .reduce((a, c) => a + c, 0)
            ;
    }
    /**@inheritDoc */
    take(count: number): IEnumerable<T>
    {
        return new ArrayEnumerable(this._array.slice(0, count));
    }
    /**@inheritDoc */
    toArray(): T[]
    {
        return [...this._array];
    }
    /**@inheritDoc */
    toDictionary<TKey, TValue>(keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
    {
        return this._array.reduce(
            (dict, val) =>
            {
                dict.addKeyValue(keySelector(val), valueSelector(val));
                return dict;
            },
            new Dictionary<TKey, TValue>()
        );
    }
    /**@inheritDoc */
    toList(): IList<T>
    {
        throw new NotImplementedException();
    }
    /**@inheritDoc */
    where(predicate: Predicate<T>): IEnumerable<T>
    {
        return new ArrayEnumerable(whereArray(this._array, predicate));
    }
}

export class Collection<T> extends ArrayEnumerable<T> implements ICollection<T>, IEnumerable<T>
{
    constructor(enumerableOrArray?: IEnumerableOrArray<T>)
    {
        if (isUndefinedOrNull(enumerableOrArray))
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
        return copyTo(this._array, array, arrayIndex);
    }

    public remove(item: T): boolean
    {
        return remove(this._array, item);
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
        return this.concat(Enumerable.asEnumerable([item]));
    }

    concat(next: IEnumerable<T>): IEnumerable<T>
    {
        return new EnumeratorEnumerable(new AppendEnumerator(this.getEnumerator(), next.getEnumerator()));
    }

    prepend(item: T): IEnumerable<T>
    {
        return Enumerable.asEnumerable([item]).concat(this);
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

    ofType<N extends T>(ctor: new (...args: unknown[]) => N): IEnumerable<N>
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
        this.forEach((value/*, index*/) =>
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
}

export class List<T> extends Collection<T> implements IList<T>, ICollection<T>, IEnumerable<T>
{
    public addRange(enumerableOrArray: IEnumerableOrArray<T>): void
    {
        const array = asArray(enumerableOrArray);
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

    public prepend(obj: T): IEnumerable<T>
    {
        this.insert(obj, 0);
        return this;
    }

    public prependRange(enumerableOrArray: IEnumerableOrArray<T>): void
    {
        const array = asArray(enumerableOrArray);
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

function toList<T>(enumerable: IEnumerable<T>): IList<T>
{
    return new List<T>(enumerable);
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

function groupBy<T, TKey>(enumerable: IEnumerable<T>, selector: Selector<T, TKey>, comparer: IComparer<TKey> = DefaultComparers.DefaultComparer): IEnumerable<IEnumerableGroup<T, TKey>>
{


    const keySet = enumerable.select(selector).distinct((k) => k).orderBy(k => k);
    return keySet.select((key) => new EnumerableGroup(enumerable, key, selector, comparer));
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

function range(start: number, count: number): IEnumerable<number>
{

    //return new EnumeratorEnumerable(new RangeEnumerator(start, count));
    return new RangeEnumerable(start, count);
}

class EmptyEnumerable<T> extends EnumerableBase<T>
{
    private static _inner = new ArrayEnumerator([], true);
    private static _empty?: IEnumerable<unknown>;

    public static get instance(): IEnumerable<unknown>
    {

        if (isUndefinedOrNull(EmptyEnumerable._empty))
        {
            EmptyEnumerable._empty = new EmptyEnumerable();
        }
        return EmptyEnumerable._empty;
    }

    public getEnumerator(): IEnumerator<T>
    {
        return EmptyEnumerable._inner;
    }
}

function empty<TElement>(): IEnumerable<TElement>
{
    return EmptyEnumerable.instance as IEnumerable<TElement>;// doesnt matter
}

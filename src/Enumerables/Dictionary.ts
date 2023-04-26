import './utils/IEnumerable/_imports';


import { ConstructorFor, KeyValuePair, Predicate, Selector, Undefinable } from "../Types";
import DictionaryEnumerator from "../Enumerators/DictionaryEnumerator";
import getHash from '../Utilities/getHash';
import KeyAlreadyDefinedException from '../Exceptions/KeyAlreadyDefinedException';
import KeyNotFoundException from '../Exceptions/KeyNotFoundException';
import { IEnumerable, IDictionary, ICollection, IEnumerableGroup, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import asArray from './utils/asArray';
import { IComparer } from '../Comparers';
import concat from './utils/IEnumerable/concat';
import all from './utils/IEnumerable/all';
import any from './utils/IEnumerable/any';
import append from './utils/IEnumerable/append';
import prepend from './utils/IEnumerable/prepend';
import average from './utils/IEnumerable/average';
import count from './utils/IEnumerable/count';
import distinct from './utils/IEnumerable/distinct';
import first from './utils/IEnumerable/first';
import firstOrDefault from './utils/IEnumerable/firstOrDefault';
import forEach from './utils/IEnumerable/forEach';
import groupBy from './utils/IEnumerable/groupBy';
import item from './utils/IEnumerable/item';
import last from './utils/IEnumerable/last';
import lastOrDefault from './utils/IEnumerable/lastOrDefault';
import max from './utils/IEnumerable/max';
import min from './utils/IEnumerable/min';
import ofType from './utils/IEnumerable/ofType';
import orderBy from './utils/IEnumerable/orderBy';
import orderByDescending from './utils/IEnumerable/orderByDescending';
import select from './utils/IEnumerable/select';
import single from './utils/IEnumerable/single';
import selectMany from './utils/IEnumerable/selectMany';
import singleOrDefault from './utils/IEnumerable/singleOrDefault';
import split from './utils/IEnumerable/split';
import sum from './utils/IEnumerable/sum';
import skip from './utils/IEnumerable/skip';
import take from './utils/IEnumerable/take';
import toArray from './utils/IEnumerable/toArray';
import toDictionary from './utils/IEnumerable/toDictionary';
import toList from './utils/IEnumerable/toList';
import where from './utils/IEnumerable/where';

export default class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue>, ICollection<KeyValuePair<TKey, TValue>>, IEnumerable<KeyValuePair<TKey, TValue>>
{
    #hashtable: { [hash: string]: KeyValuePair<TKey, TValue>; };

    public readonly isReadOnly: boolean = false;

    // constructor
    constructor(source?: Iterable<KeyValuePair<TKey, TValue>>)
    {
        this.#hashtable = {};

        if (source)
        {
            const items = asArray<KeyValuePair<TKey, TValue>>(source);
            for (const item of items)
            {
                this.add(item);
            }
        }
    }
    all(predicate: Predicate<KeyValuePair<TKey, TValue>>): boolean
    {
        return all(this, predicate);
    }
    append(item: KeyValuePair<TKey, TValue>): IEnumerable<KeyValuePair<TKey, TValue>>
    {
        return append(this, item);
    }
    any(predicate?: Predicate<KeyValuePair<TKey, TValue>> | undefined): boolean
    {
        return any(this, predicate);
    }
    average(selector: Selector<KeyValuePair<TKey, TValue>, number>): number
    {
        return average(this, selector);
    }
    concat(next: IEnumerable<KeyValuePair<TKey, TValue>>): IEnumerable<KeyValuePair<TKey, TValue>>
    {
        return concat(this, next);
    }
    count(): number
    {
        return count(this);
    }
    distinct<R>(selector: Selector<KeyValuePair<TKey, TValue>, R>): IEnumerable<KeyValuePair<TKey, TValue>>
    {
        return distinct(this, selector);
    }
    first(predicate?: Predicate<KeyValuePair<TKey, TValue>>): KeyValuePair<TKey, TValue>
    {
        return first(this, predicate);
    }
    firstOrDefault(predicate?: Predicate<KeyValuePair<TKey, TValue>>): KeyValuePair<TKey, TValue> | null
    {
        return firstOrDefault(this, predicate);
    }
    forEach(callback: (value: KeyValuePair<TKey, TValue>, index: number) => boolean | void): void
    {
        return forEach(this, callback);
    }
    groupBy<TKey2>(keySelector: Selector<KeyValuePair<TKey, TValue>, TKey2>, comparer?: IComparer<TKey2>): IEnumerable<IEnumerableGroup<KeyValuePair<TKey, TValue>, TKey2>>
    {
        return groupBy(this, keySelector, comparer);
    }
    item(index: number): Undefinable<KeyValuePair<TKey, TValue>>
    {
        return item(this, index);
    }
    last(predicate?: Predicate<KeyValuePair<TKey, TValue>>): KeyValuePair<TKey, TValue>
    {
        return last(this, predicate);
    }
    lastOrDefault(predicate?: Predicate<KeyValuePair<TKey, TValue>>): KeyValuePair<TKey, TValue> | null
    {
        return lastOrDefault(this, predicate);
    }
    max(selector: Selector<KeyValuePair<TKey, TValue>, number>): number
    {
        return max(this, selector);
    }
    min(selector: Selector<KeyValuePair<TKey, TValue>, number>): number
    {
        return min(this, selector);
    }
    ofType<N extends KeyValuePair<TKey, TValue>>(ctor: ConstructorFor<N>): IEnumerable<N>
    {
        return ofType(this, ctor);
    }
    orderBy<R>(selector: Selector<KeyValuePair<TKey, TValue>, R>, comparer?: IComparer<R> | undefined): IEnumerable<KeyValuePair<TKey, TValue>>
    {
        return orderBy(this, selector, comparer);
    }
    orderByDescending<R>(selector: Selector<KeyValuePair<TKey, TValue>, R>, comparer?: IComparer<R> | undefined): IEnumerable<KeyValuePair<TKey, TValue>>
    {
        return orderByDescending(this, selector);
    }
    prepend(item: KeyValuePair<TKey, TValue>): IEnumerable<KeyValuePair<TKey, TValue>>
    {
        return prepend(this, item);
    }
    select<TOut>(selector: Selector<KeyValuePair<TKey, TValue>, TOut>): IEnumerable<TOut>
    {
        return select(this, selector);
    }
    selectMany<TOut>(selector: Selector<KeyValuePair<TKey, TValue>, IEnumerable<TOut>>): IEnumerable<TOut>
    {
        return selectMany(this, selector);
    }
    single(predicate?: Predicate<KeyValuePair<TKey, TValue>>): KeyValuePair<TKey, TValue>
    {
        return single(this, predicate);
    }
    singleOrDefault(predicate?: Predicate<KeyValuePair<TKey, TValue>>): KeyValuePair<TKey, TValue> | null
   {
    return singleOrDefault(this, predicate);
}
    skip(count: number): IEnumerable<KeyValuePair<TKey, TValue>>
    {
        return skip(this, count);
    }
    split(predicate: Predicate<KeyValuePair<TKey, TValue>>): { pTrue: IEnumerable<KeyValuePair<TKey, TValue>>; pFalse: IEnumerable<KeyValuePair<TKey, TValue>>; }
    {
        return split(this, predicate);
    }
    sum(selector: Selector<KeyValuePair<TKey, TValue>, number>): number
    {
        return sum(this, selector);
    }
    take(count: number): IEnumerable<KeyValuePair<TKey, TValue>>
    {
        return take(this, count);
    }
    toArray(): KeyValuePair<TKey, TValue>[]
    {
        return toArray(this);
    }
    toDictionary<TKey2, TValue2>(keySelector: (a: KeyValuePair<TKey, TValue>) => TKey2, valueSelector: (a: KeyValuePair<TKey, TValue>) => TValue2): IDictionary<TKey2, TValue2>
    {
        return toDictionary(this, keySelector, valueSelector);
    }
    toList(): IList<KeyValuePair<TKey, TValue>>
    {
        return toList(this);
    }
    where(predicate: Predicate<KeyValuePair<TKey, TValue>>): IEnumerable<KeyValuePair<TKey, TValue>>
    {
        return where(this, predicate);
    }
    [Symbol.iterator](): Iterator<KeyValuePair<TKey, TValue>, any, undefined>
    {
        return this.getEnumerator();
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

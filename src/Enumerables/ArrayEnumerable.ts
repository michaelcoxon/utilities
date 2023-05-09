import { ConstructorFor, Predicate, Selector, Undefinable } from "../Types";
import { IComparer } from '../Comparers/_types';
import { IEnumerable, IEnumerableGroup, IDictionary, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import { ArrayEnumerator } from '../Enumerators';
import DefaultComparers from '../Comparers/DefaultComparers';
import List from "./List";
import Dictionary from "./Dictionary";
import { NotImplementedException } from '../Exceptions';

import all from './utils/Array/all';
import any from './utils/Array/any';
import average from './utils/Array/average';
import contains from './utils/Array/contains';
import count from './utils/Array/count';
import distinct from './utils/Array/distinct';
import first from './utils/Array/first';
import firstOrDefault from './utils/Array/firstOrDefault';
import forEach from './utils/Array/forEach';
import groupBy from './utils/Array/groupBy';
import item from './utils/Array/item';
import last from './utils/Array/last';
import lastOrDefault from './utils/Array/lastOrDefault';
import max from './utils/Array/max';
import min from './utils/Array/min';
import ofType from './utils/Array/ofType';
import select from './utils/Array/select';
import single from './utils/Array/single';
import singleOrDefault from './utils/Array/singleOrDefault';
import sum from './utils/Array/sum';
import take from './utils/Array/take';
import where from './utils/Array/where';
import selectMany from './utils/Array/selectMany';
import orderByDescending from './utils/Array/orderByDescending';
import orderBy from './utils/Array/orderBy';
import toDictionary from './utils/Array/toDictionary';
import toList from './utils/Array/toList';

export default class ArrayEnumerable<T> implements IEnumerable<T>
{
    [Symbol.iterator](): Iterator<T, any, undefined>
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
        return new ArrayEnumerable([...this, item]);
    }
    /**@inheritDoc */
    any(predicate?: Predicate<T> | undefined): boolean
    {
        return any(this._array, predicate);
    }
    /**@inheritDoc */
    average(selector: Selector<T, number>): number
    {
        return average(this._array, selector);
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
        return new ArrayEnumerable(distinct(this._array, selector));
    }
    /**@inheritDoc */
    first(predicate?: Predicate<T>): T
    {
        return first(this._array, predicate);
    }

    /**@inheritDoc */
    firstOrDefault(predicate?: Predicate<T>): T | null
    {
        return firstOrDefault(this._array, predicate);
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
        const result = groupBy(this._array, keySelector, comparer);
        const en = select(result, r =>
        {
            const ar = new ArrayEnumerable(r) as {};
            ar['key'] = r.key;
            return ar as IEnumerableGroup<T, TKey>;
        });

        return new ArrayEnumerable(en);
    }
    /**@inheritDoc */
    item(index: number): Undefinable<T>
    {
        return item(this._array, index);
    }
    /**@inheritDoc */
    last(predicate?: Predicate<T>): T
    {
        return last(this._array, predicate);
    }
    /**@inheritDoc */
    lastOrDefault(predicate?: Predicate<T>): T | null
    {
        return lastOrDefault(this._array, predicate);
    }
    /**@inheritDoc */
    max(selector: Selector<T, number>): number
    {
        return max(this._array, selector);
    }
    /**@inheritDoc */
    min(selector: Selector<T, number>): number
    {
        return min(this._array, selector);
    }
    /**@inheritDoc */
    ofType<N extends T>(ctor: ConstructorFor<N>): IEnumerable<N>
    {
        return new ArrayEnumerable(ofType(this._array, ctor));
    }
    /**@inheritDoc */
    orderBy<R>(selector: Selector<T, R>, comparer?: IComparer<R> | undefined): IEnumerable<T>
    {
        return new ArrayEnumerable(orderBy(this._array, selector, comparer || DefaultComparers.DefaultComparer));
    }
    /**@inheritDoc */
    orderByDescending<R>(selector: Selector<T, R>, comparer?: IComparer<R> | undefined): IEnumerable<T>
    {
        return new ArrayEnumerable(orderByDescending(this._array, selector, comparer || DefaultComparers.DefaultComparer));
    }

    /**@inheritDoc */
    prepend(item: T): IEnumerable<T>
    {
        return new ArrayEnumerable([item, ...this._array]);
    }
    /**@inheritDoc */
    select<TOut>(selector: Selector<T, TOut>): IEnumerable<TOut>
    {
        return new ArrayEnumerable(select(this._array, selector));
    }
    /**@inheritDoc */
    selectMany<TOut>(selector: Selector<T, IEnumerable<TOut>>): IEnumerable<TOut>
    {
        return new ArrayEnumerable(selectMany(this._array, v => selector(v).toArray()));
    }
    /**@inheritDoc */
    single(predicate?: Predicate<T>): T
    {
        return single(this._array, predicate);
    }
    /**@inheritDoc */
    singleOrDefault(predicate?: Predicate<T>): T | null
    {
        return singleOrDefault(this._array, predicate);
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
        return sum(this._array, selector);
    }
    /**@inheritDoc */
    take(count: number): IEnumerable<T>
    {
        return new ArrayEnumerable(take(this._array, count));
    }
    /**@inheritDoc */
    toArray(): T[]
    {
        return [...this._array];
    }
    /**@inheritDoc */
    toDictionary<TKey, TValue>(keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
    {
        return toDictionary(this._array, keySelector, valueSelector);
    }
    /**@inheritDoc */
    toList(): IList<T>
    {
        return toList(this._array);
    }
    /**@inheritDoc */
    where(predicate: Predicate<T>): IEnumerable<T>
    {
        return new ArrayEnumerable(where(this._array, predicate));
    }
}



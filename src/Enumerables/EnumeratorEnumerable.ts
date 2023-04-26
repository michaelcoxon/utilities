import { IComparer } from '../Comparers';
import { IEnumerator } from '../Enumerators/_types';
import { Predicate, Selector, Undefinable, ConstructorFor } from '../Types';
import { IDictionary, IEnumerable, IEnumerableGroup, IList } from './_types';
import contains from './utils/IEnumerable/contains';
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
import selectMany from './utils/IEnumerable/selectMany';
import single from './utils/IEnumerable/single';
import singleOrDefault from './utils/IEnumerable/singleOrDefault';
import take from './utils/IEnumerable/take';
import where from './utils/IEnumerable/where';
import all from './utils/IEnumerable/all';
import append from './utils/IEnumerable/append';
import concat from './utils/IEnumerable/concat';
import prepend from './utils/IEnumerable/prepend';
import skip from './utils/IEnumerable/skip';
import split from './utils/IEnumerable/split';
import toArray from './utils/IEnumerable/toArray';
import toDictionary from './utils/IEnumerable/toDictionary';
import toList from './utils/IEnumerable/toList';
import average from './utils/IEnumerable/average';
import any from './utils/IEnumerable/any';
import sum from './utils/IEnumerable/sum';


export class EnumeratorEnumerable<T> implements IEnumerable<T>
{
    [Symbol.iterator](): Iterator<T>
    {
        return this.getEnumerator();
    }
    readonly #enumerator: IEnumerator<T>;

    constructor(enumerator: IEnumerator<T>)
    {
        this.#enumerator = enumerator;
    }

    getEnumerator(): IEnumerator<T>
    {
        return this.#enumerator;
    }

    all(predicate: Predicate<T>): boolean
    {
        return all(this, predicate);
    }
    append(item: T): IEnumerable<T>
    {
        return append(this, item);
    }
    any(predicate?: Predicate<T> | undefined): boolean
    {
        return any(this, predicate);
    }
    average(selector: Selector<T, number>): number
    {
        return average(this, selector);
    }
    concat(next: IEnumerable<T>): IEnumerable<T>
    {
        return concat(this, next);
    }
    contains(item: T): boolean
    {
        return contains(this, item);
    }
    count(): number
    {
        return count(this);
    }
    distinct<R>(selector: Selector<T, R>): IEnumerable<T>
    {
        return distinct(this, selector);
    }
    first(predicate?: Predicate<T>): T
    {
        return first(this, predicate);
    }
    firstOrDefault(predicate?: Predicate<T>): T | null
    {
        return firstOrDefault(this, predicate);
    }
    forEach(callback: (value: T, index: number) => boolean | void): void
    {
        return forEach(this, callback);
    }
    groupBy<TKey2>(keySelector: Selector<T, TKey2>, comparer?: IComparer<TKey2>): IEnumerable<IEnumerableGroup<T, TKey2>>
    {
        return groupBy(this, keySelector, comparer);
    }
    item(index: number): Undefinable<T>
    {
        return item(this, index);
    }
    last(predicate?: Predicate<T>): T
    {
        return last(this, predicate);
    }
    lastOrDefault(predicate?: Predicate<T>): T | null
    {
        return lastOrDefault(this, predicate);
    }
    max(selector: Selector<T, number>): number
    {
        return max(this, selector);
    }
    min(selector: Selector<T, number>): number
    {
        return min(this, selector);
    }
    ofType<N extends T>(ctor: ConstructorFor<N>): IEnumerable<N>
    {
        return ofType(this, ctor);
    }
    orderBy<R>(selector: Selector<T, R>, comparer?: IComparer<R> | undefined): IEnumerable<T>
    {
        return orderBy(this, selector, comparer);
    }
    orderByDescending<R>(selector: Selector<T, R>, comparer?: IComparer<R> | undefined): IEnumerable<T>
    {
        return orderByDescending(this, selector);
    }
    prepend(item: T): IEnumerable<T>
    {
        return prepend(this, item);
    }
    select<TOut>(selector: Selector<T, TOut>): IEnumerable<TOut>
    {
        return select(this, selector);
    }
    selectMany<TOut>(selector: Selector<T, IEnumerable<TOut>>): IEnumerable<TOut>
    {
        return selectMany(this, selector);
    }
    single(predicate?: Predicate<T>): T
    {
        return single(this, predicate);
    }
    singleOrDefault(predicate?: Predicate<T>): T | null
    {
        return singleOrDefault(this, predicate);
    }
    skip(count: number): IEnumerable<T>
    {
        return skip(this, count);
    }
    split(predicate: Predicate<T>): { pTrue: IEnumerable<T>; pFalse: IEnumerable<T>; }
    {
        return split(this, predicate);
    }
    sum(selector: Selector<T, number>): number
    {
        return sum(this, selector);
    }
    take(count: number): IEnumerable<T>
    {
        return take(this, count);
    }
    toArray(): T[]
    {
        return toArray(this);
    }
    toDictionary<TKey2, TValue2>(keySelector: (a: T) => TKey2, valueSelector: (a: T) => TValue2): IDictionary<TKey2, TValue2>
    {
        return toDictionary(this, keySelector, valueSelector);
    }
    toList(): IList<T>
    {
        return toList(this);
    }
    where(predicate: Predicate<T>): IEnumerable<T>
    {
        return where(this, predicate);
    }
}

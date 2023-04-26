import { IComparer } from '../../../Comparers';
import { IEnumerator } from '../../../Enumerators';
import { Undefinable, Predicate, Selector, ConstructorFor } from '../../../Types';
import { IEnumerable, IEnumerableGroup, IDictionary, IList } from '../../_types';
import groupBy from './groupBy';
import orderBy from './orderBy';
import orderByDescending from './orderByDescending';
import select from './select';
import selectMany from './selectMany';
import take from './take';
import where from './where';
import all from './all';
import append from './append';
import concat from './concat';
import contains from './contains';
import count from './count';
import distinct from './distinct';
import first from './first';
import firstOrDefault from './firstOrDefault';
import forEach from './forEach';
import item from './item';
import last from './last';
import lastOrDefault from './lastOrDefault';
import max from './max';
import min from './min';
import ofType from './ofType';
import prepend from './prepend';
import single from './single';
import singleOrDefault from './singleOrDefault';
import skip from './skip';
import split from './split';
import toArray from './toArray';
import toDictionary from './toDictionary';
import toList from './toList';
import any from './any';
import average from './average';
import sum from './sum';

export default abstract class EnumerableBase<T> implements IEnumerable<T>
{
    [Symbol.iterator](): Iterator<T>
    {
        return this.getEnumerator();
    }

    public abstract getEnumerator(): IEnumerator<T>;

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
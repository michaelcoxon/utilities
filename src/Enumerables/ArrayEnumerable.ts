import { ConstructorFor, Predicate, Selector, Undefinable } from "../Types";
import { IComparer } from '../Comparers/_types';
import { IEnumerable, IEnumerableGroup, IDictionary, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import { isUndefinedOrNull } from '../TypeHelpers';
import { ArrayEnumerator } from '../Enumerators';
import DefaultComparers from '../Comparers/DefaultComparers';
import ReverseComparer from '../Comparers/ReverseComparer';
import MapComparer from '../Comparers/MapComparer';
import { Dictionary } from './index';
import { InvalidOperationException, NotImplementedException } from '../Exceptions';

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

export class ArrayEnumerable<T> implements IEnumerable<T>
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
        let result = isUndefinedOrNull(predicate)
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
        return new ArrayEnumerable(ofType(this._array, ctor));
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
        return new  ArrayEnumerable(where(this._array, predicate));
    }
}



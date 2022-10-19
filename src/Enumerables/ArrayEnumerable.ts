import { ConstructorFor, Predicate, Selector, Undefinable } from "../Types";
import { IComparer } from '../Comparers/_types';
import { IEnumerable, IEnumerableGroup, IDictionary, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import { isUndefinedOrNull } from '../TypeHelpers';
import { ArrayEnumerator } from '../Enumerators';
import distinct from './utils/IEnumerable/distinct';
import DefaultComparers from '../Comparers/DefaultComparers';
import ofType from './utils/IEnumerable/ofType';
import ReverseComparer from '../Comparers/ReverseComparer';
import MapComparer from '../Comparers/MapComparer';
import { Dictionary } from '.';
import forEach from './utils/Array/forEach';


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

    all(predicate: Predicate<T>): boolean
    {
        return this._array.every(predicate);
    }
    append(item: T): IEnumerable<T>
    {
        return new ArrayEnumerable([...this, item]);
    }
    any(predicate?: Predicate<T> | undefined): boolean
    {
        if (isUndefinedOrNull(predicate))
        {
            return this._array.length > 0;
        }
        return this._array.some(predicate);
    }
    average(selector: Selector<T, number>): number
    {
        return this._array.reduce((p, c) => p + selector(c), 0) / this._array.length;
    }
    concat(next: IEnumerable<T>): IEnumerable<T>
    {
        return new ArrayEnumerable([...this._array, ...next]);
    }
    contains(item: T): boolean
    {
        return this._array.indexOf(item) > -1;
    }
    count(): number
    {
        return this._array.length;
    }
    distinct<R>(selector: Selector<T, R>): IEnumerable<T>
    {
        return distinct(this, selector);
    }
    first(predicate?: Predicate<T>): T
    {
        const result = this.firstOrDefault(predicate);
        if (isUndefinedOrNull(result))
        {
            throw new Error('There are no results');
        }
        return result;
    }

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
    forEach(callback: (value: T, index: number) => boolean | void): void
    {
        return forEach(this._array, callback);
    }
    getEnumerator(): IEnumerator<T>
    {
        return new ArrayEnumerator(this._array);
    }
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
    item(index: number): Undefinable<T>
    {
        return this._array[index];
    }
    last(predicate?: Predicate<T>): T
    {
        const result = this.lastOrDefault(predicate);
        if (isUndefinedOrNull(result))
        {
            throw new Error('There are no results');
        }
        return result;
    }
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
    max(selector: Selector<T, number>): number
    {
        return Math.max(...this._array.map(selector));
    }
    min(selector: Selector<T, number>): number
    {
        return Math.min(...this._array.map(selector));
    }
    ofType<N extends T>(ctor: ConstructorFor<N>): IEnumerable<N>
    {
        return ofType(this, ctor);
    }
    orderBy<R>(selector: Selector<T, R>, comparer?: IComparer<R> | undefined): IEnumerable<T>
    {
        return this.internalOrderBy(selector, comparer || DefaultComparers.DefaultComparer);
    }
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

    prepend(item: T): IEnumerable<T>
    {
        return new ArrayEnumerable([item, ...this._array]);
    }
    select<TOut>(selector: Selector<T, TOut>): IEnumerable<TOut>
    {
        return new ArrayEnumerable(this._array.map(selector));
    }
    selectMany<TOut>(selector: Selector<T, IEnumerable<TOut>>): IEnumerable<TOut>
    {
        return new ArrayEnumerable(this._array.reduce(
            (results: TOut[], t: T) => [...results, ...selector(t)],
            []
        ));
    }
    single(predicate?: Predicate<T>): T
    {
        const result = this.singleOrDefault(predicate);

        if (isUndefinedOrNull(result))
        {
            throw new Error('There is no result.');
        }

        return result;
    }
    singleOrDefault(predicate?: Predicate<T>): T | null
    {
        const result = isUndefinedOrNull(predicate)
            ? this._array
            : this._array.filter(predicate)
            ;

        if (result.length > 1)
        {
            throw new Error('More than one match in the collection.');
        }
        if (result.length !== 1)
        {
            return null;
        }

        return result[0];
    }
    skip(count: number): IEnumerable<T>
    {
        return new ArrayEnumerable(this._array.slice(count));
    }
    split(predicate: Predicate<T>): { pTrue: IEnumerable<T>; pFalse: IEnumerable<T>; }
    {
        return {
            pTrue: this.where(i => predicate(i)),
            pFalse: this.where(i => !predicate(i))
        };
    }
    sum(selector: Selector<T, number>): number
    {
        return this._array
            .map((item) => selector(item))
            .reduce((a, c) => a + c, 0)
            ;
    }
    take(count: number): IEnumerable<T>
    {
        return new ArrayEnumerable(this._array.slice(0, count));
    }
    toArray(): T[]
    {
        return [...this._array];
    }
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
    toList(): IList<T>
    {
        throw new Error('toList Error/Method not implemented.');
    }
    where(predicate: Predicate<T>): IEnumerable<T>
    {
        return new ArrayEnumerable(this._array.filter(predicate));
    }
}



import DefaultComparers from "../Comparers/DefaultComparers";
import MapComparer from "../Comparers/MapComparer";
import ReverseComparer from "../Comparers/ReverseComparer";
import { ConstructorFor, IEnumerableOrArray, Predicate, Selector, Undefinable } from "../Types";
import AppendEnumerator from "../Enumerators/AppendEnumerator";
import ArrayEnumerator from "../Enumerators/ArrayEnumerator";
import getHash from '../Utilities/getHash';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import InvalidOperationException from '../Exceptions/InvalidOperationException';
import NullReferenceException from '../Exceptions/NullReferenceException';
import { IComparer } from '../Comparers/_types';
import { IEnumerable, IEnumerableGroup, IDictionary, IList } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import WhereEnumerable from './WhereEnumerable';
import TakeEnumerable from './TakeEnumerable';
import SkipEnumerable from './SkipEnumerable';
import SelectManyEnumerable from './SelectManyEnumerable';
import SelectEnumerable from './SelectEnumerable';
import RangeEnumerable from './RangeEnumerable';
import EnumerableGroup from './EnumerableGroup';
import ArrayEnumerable from './ArrayEnumerable';
import EnumeratorEnumerable from './EnumeratorEnumerable';


export default abstract class Enumerable<T> implements IEnumerable<T>
{
    [Symbol.iterator](): Iterator<T>
    {
        return this.getEnumerator();
    }
    public abstract getEnumerator(): IEnumerator<T>;

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
        const en = this.getEnumerator();
        while (en.moveNext())
        {
            if (en.current === item)
            {
                return true;
            }
        }

        return false;
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

    /**
     * Returns only the distinct items in the {@link IEnumerable<T>}
     *
     * @param selector a function that returns the value to filter by.
     */
    public distinct<R>(selector: Selector<T, R>): IEnumerable<T>
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
        let enumerable: IEnumerable<T> = isUndefinedOrNull(predicate)
            ? this
            : this.where(predicate);

        const en = enumerable.getEnumerator();

        if (en.moveNext())
        {
            return en.current;
        }

        throw new InvalidOperationException("The collection is empty!");
    }

    public firstOrDefault(): T | null;
    public firstOrDefault(predicate: Predicate<T>): T | null;
    public firstOrDefault(predicate?: Predicate<T>): T | null
    {
        let enumerable: IEnumerable<T> = isUndefinedOrNull(predicate)
            ? this
            : this.where(predicate);

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
        let enumerable: IEnumerable<T> = isUndefinedOrNull(predicate)
            ? this
            : this.where(predicate);

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
                throw new InvalidOperationException("There is no last item matching the predicate!");
            }

            else
            {
                throw new InvalidOperationException("The collection is empty!");
            }
        }
    }

    public lastOrDefault(): T | null;
    public lastOrDefault(predicate: Predicate<T>): T | null;
    public lastOrDefault(predicate?: Predicate<T>): T | null
    {
        let enumerable: IEnumerable<T> = isUndefinedOrNull(predicate)
            ? this
            : this.where(predicate);

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
        let enumerable: IEnumerable<T> = isUndefinedOrNull(predicate)
            ? this
            : this.where(predicate);

        const en = enumerable.getEnumerator();

        let returnValue: Undefinable<T>;

        while (en.moveNext())
        {
            if (!isUndefinedOrNull(returnValue))
            {
                throw new InvalidOperationException("More than one match in the collection.");
            }
            returnValue = en.current;
        }

        if (isUndefinedOrNull(returnValue))
        {
            throw new NullReferenceException("The result is undefined.");
        }

        return returnValue;
    }

    public singleOrDefault(): T | null;
    public singleOrDefault(predicate: Predicate<T>): T | null;
    public singleOrDefault(predicate?: Predicate<T>): T | null
    {
        let enumerable: IEnumerable<T> = isUndefinedOrNull(predicate)
            ? this
            : this.where(predicate);

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
            return null;
        }

        return returnValue;
    }

    public skip(count: number): IEnumerable<T>
    {
        return new SkipEnumerable(this, count);
    }

    public split(predicate: Predicate<T>): { pTrue: IEnumerable<T>; pFalse: IEnumerable<T>; }
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

    public abstract toArray(): T[];
    /*
    {
        const array: T[] = [];
        const en = this.getEnumerator();
        while (en.moveNext())
        {
            array.push(en.current);
        }
        return array;
    }
    */
    public abstract toDictionary<TKey, TValue>(keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>;
    /*
    {
        const dictionary = new Dictionary<TKey, TValue>();
        const en = this.getEnumerator();
        while (en.moveNext())
        {
            dictionary.addKeyValue(keySelector(en.current), valueSelector(en.current));
        }
        return dictionary;
    }
    */
    public abstract toList(): IList<T>;
    /*
    {
        const list = new List<T>();
        const en = this.getEnumerator();
        while (en.moveNext())
        {
            list.add(en.current);
        }
        return list;
    }
    */
    private internalOrderBy<R>(selector: (a: T) => R, comparer: IComparer<R>): IEnumerable<T>
    {
        // HACK: this could be better...
        const list = this.toList();
        const mapComparer = new MapComparer(selector, comparer);
        list.sort(mapComparer);
        return list;
    }
}

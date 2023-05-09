import './utils/IEnumerable/_imports';

import { IEnumerable } from './_types';
import asArray from './utils/asArray';
import asEnumerable from './utils/asEnumerable';
import { RangeEnumerable } from './RangeEnumerable';
import EnumerableBase from './utils/IEnumerable/EnumerableBase';
import { IEnumerator } from '../Enumerators';

export default class Enumerable extends EnumerableBase<unknown>
{
    public getEnumerator(): IEnumerator<unknown>
    {
        return Enumerable.empty().getEnumerator();
    }

    public static range(start: number, count: number): IEnumerable<number>
    {
        return new RangeEnumerable(start, count);
    }

    public static empty<TElement>(): IEnumerable<TElement>
    {
        return asEnumerable([]);
    }

    public static asArray<T>(iterable: Iterable<T>): T[]
    {
        return asArray(iterable);
    }

    public static asEnumerable<T>(iterable: Iterable<T>): IEnumerable<T>
    {
        return asEnumerable(iterable);
    }
}

import './utils/IEnumerable/_imports';

import { IEnumerable } from './_types';
import asArray from './utils/asArray';
import asEnumerable from './utils/asEnumerable';
import { RangeEnumerable } from './RangeEnumerable';

export default class Enumerable
{
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

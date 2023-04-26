import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import { IEnumerable, ICollection } from './_types';
import ArrayEnumerable from './ArrayEnumerable';
import remove from './utils/Collection/remove';
import copyTo from './utils/Collection/copyTo';
import asArray from './utils/asArray';


export default class Collection<T> extends ArrayEnumerable<T> implements ICollection<T>, IEnumerable<T>
{
    constructor(iterable?: Iterable<T>)
    {
        if (isUndefinedOrNull(iterable))
        {
            super([]);
        }
        else
        {
            super(asArray<T>(iterable));
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

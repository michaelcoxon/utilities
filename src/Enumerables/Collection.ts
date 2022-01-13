import { IEnumerableOrArray } from "../Types";
import ArrayEnumerator from "../Enumerators/ArrayEnumerator";
import ArgumentException from '../Exceptions/ArgumentException';
import { IEnumerable, IDictionary, IList, ICollection } from './_types';
import { IEnumerator } from '../Enumerators/_types';
import { toArray, toDictionary, toList } from './_helpers';
import  Enumerable  from "./Enumerable";


export  default class Collection<T> extends Enumerable<T> implements ICollection<T>, IEnumerable<T>
{
    protected _array: T[];

    public getEnumerator(): IEnumerator<T>
    {
        return new ArrayEnumerator<T>(this._array);
    }

    constructor(enumerableOrArray?: IEnumerableOrArray<T>)
    {
        super();
        this._array = Array.from(enumerableOrArray ?? []);
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
        if (this.length > (array.length - arrayIndex))
        {
            throw new ArgumentException("array", "Array is not big enough to store the collection");
        }
        array.splice(arrayIndex, this.length, ...this._array);
    }

    public forEach(callback: (value: T, index: number, source: ICollection<T>) => boolean | void): void
    {
        const en = this.getEnumerator();
        let count = 0;
        while (en.moveNext())
        {
            const value = callback(en.current, count, this);
            if (value === false)
            {
                break;
            }
            count++;
        }
    }

    public remove(item: T): boolean
    {
        const index = this._array.indexOf(item);

        if (index != undefined)
        {
            this._array.splice(index, 1);
            return true;
        }

        else
        {
            return false;
        }
    }

    public toArray(): T[]
    {
        return toArray(this);
    }
    public toDictionary<TKey, TValue>(keySelector: (a: T) => TKey, valueSelector: (a: T) => TValue): IDictionary<TKey, TValue>
    {
        return toDictionary(this, keySelector, valueSelector);
    }
    public toList(): IList<T>
    {
        return toList(this);
    }
}

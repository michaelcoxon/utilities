import ArgumentException from '../Exceptions/ArgumentException';
import ArgumentUndefinedException from '../Exceptions/ArgumentUndefinedException';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import { IComparer } from "./IComparer";
import { IEqualityComparer } from "./IEqualityComparer";

export default class CustomComparer<T> implements IComparer<T>, IEqualityComparer<T>
{
    readonly #comparer?: (a: T, b: T) => number;
    readonly #equalityComparer?: (x: T, y: T) => boolean;

    constructor(comparer?: (a: T, b: T) => number, equalityComparer?: (x: T, y: T) => boolean)
    {
        if (isUndefinedOrNull(comparer) && isUndefinedOrNull(equalityComparer))
        {
            throw new ArgumentException("You must provide at least one argument.");
        }
        this.#comparer = comparer;
        this.#equalityComparer = equalityComparer;
    }

    public compare(x: T, y: T): number
    {
        if (this.#comparer)
        {
            return this.#comparer(x, y);
        }
        else
        {
            throw new ArgumentUndefinedException("The comparer");
        }
    }

    public equals(x: T, y: T): boolean
    {
        if (this.#equalityComparer)
        {
            return this.#equalityComparer(x, y);
        }
        else
        {
            throw new ArgumentUndefinedException("The equality comparer");
        }
    }

    public greaterThan(x: T, y: T): boolean
    {
        return this.compare(x, y) > 0;
    }

    public greaterThanOrEqual(x: T, y: T): boolean
    {
        return this.compare(x, y) >= 0;
    }

    public lessThan(x: T, y: T): boolean
    {
        return this.compare(x, y) < 0;
    }

    public lessThanOrEqual(x: T, y: T): boolean
    {
        return this.compare(x, y) <= 0;
    }
}

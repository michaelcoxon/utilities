import { IComparer } from "./IComparer";
import { IEqualityComparer } from './IEqualityComparer';

/** reverses the comparer provided */
export default class ReverseComparer<T> implements IComparer<T>, IEqualityComparer<T>
{
    readonly #comparer: IComparer<T>;

    constructor(comparer: IComparer<T>)
    {
        this.#comparer = comparer;
    }

    public compare(x: T, y: T): number
    {
        return this.#comparer.compare(y, x);
    }

    public equals(x: T, y: T): boolean
    {
        return this.#comparer.equals(y, x);
    }

    public greaterThan(x: T, y: T): boolean
    {
        return this.#comparer.greaterThan(y, x);
    }

    public greaterThanOrEqual(x: T, y: T): boolean
    {
        return this.#comparer.greaterThanOrEqual(y, x);
    }

    public lessThan(x: T, y: T): boolean
    {
        return this.#comparer.lessThan(y, x);
    }

    public lessThanOrEqual(x: T, y: T): boolean
    {
        return this.#comparer.lessThanOrEqual(y, x);
    }
}

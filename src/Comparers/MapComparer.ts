import { IComparer, IEqualityComparer } from './_types';

/**
 * Compares objects of the same type using a custom selector and 
 * a comparer for the selector's return value.
 */
export default class MapComparer<T, TProperty> implements IComparer<T>, IEqualityComparer<T>
{
    readonly #selector: (a: T) => TProperty;
    readonly #comparer: IComparer<TProperty>;

    constructor(selector: (a: T) => TProperty,comparer: IComparer<TProperty>)
    {
        this.#selector = selector;
        this.#comparer = comparer;
    }

    public compare(x: T, y: T): number
    {
        const x_value = this.#selector(x);
        const y_value = this.#selector(y);

        return this.#comparer.compare(x_value, y_value);
    }

    public equals(x: T, y: T): boolean
    {
        const x_value = this.#selector(x);
        const y_value = this.#selector(y);

        return this.#comparer.equals(x_value, y_value);
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

import { DefaultComparers } from './DefaultComparers';
import { IComparer, IEqualityComparer } from './_types';

export default class DefaultComparer<T> implements IComparer<T>, IEqualityComparer<T> {
    public compare(x: T, y: T): number
    {
        if (typeof x == 'string' && typeof y == 'string')
        {
            return DefaultComparers.StringComparer.compare(x, y);
        }
        else if (typeof x == 'number' && typeof y == 'number')
        {
            return DefaultComparers.NumberComparer.compare(x, y);
        }

        else
        {
            return DefaultComparers.ObjectComparer.compare(x, y);
        }
    }

    public equals(x: T, y: T): boolean
    {
        if (typeof x == 'string' && typeof y == 'string')
        {
            return DefaultComparers.StringComparer.equals(x, y);
        }
        else if (typeof x == 'number' && typeof y == 'number')
        {
            return DefaultComparers.NumberComparer.equals(x, y);
        }

        else
        {
            return DefaultComparers.ObjectComparer.equals(x, y);
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

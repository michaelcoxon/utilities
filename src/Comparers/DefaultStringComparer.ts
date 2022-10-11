import { IComparer, IEqualityComparer } from './_types';

/**
 * Default implementation
 */
 export default class DefaultStringComparer implements IComparer<string>, IEqualityComparer<string> {
    public compare(x: string, y: string): number
    {
        if (x < y)
        {
            return -1;
        }

        if (x > y)
        {
            return 1;
        }

        return 0;
    }

    public equals(x: string, y: string): boolean
    {
        return x === y;
    }

    public greaterThan(x: string, y: string): boolean
    {
        return this.compare(x, y) > 0;
    }

    public greaterThanOrEqual(x: string, y: string): boolean
    {
        return this.compare(x, y) >= 0;
    }

    public lessThan(x: string, y: string): boolean
    {
        return this.compare(x, y) < 0;
    }

    public lessThanOrEqual(x: string, y: string): boolean
    {
        return this.compare(x, y) <= 0;
    }
}

import { IComparer } from "./IComparer";
import { IEqualityComparer } from './IEqualityComparer';

export default class DefaultNumberComparer implements IComparer<number>, IEqualityComparer<number> {
    public compare(x: number, y: number): number
    {
        const result = x - y;

        if (result < 0)
            return -1;
        if (result > 0)
            return 1;
        return result;
    }

    public equals(x: number, y: number): boolean
    {
        return x === y;
    }

    public greaterThan(x: number, y: number): boolean
    {
        return this.compare(x, y) > 0;
    }

    public greaterThanOrEqual(x: number, y: number): boolean
    {
        return this.compare(x, y) >= 0;
    }

    public lessThan(x: number, y: number): boolean
    {
        return this.compare(x, y) < 0;
    }

    public lessThanOrEqual(x: number, y: number): boolean
    {
        return this.compare(x, y) <= 0;
    }
}

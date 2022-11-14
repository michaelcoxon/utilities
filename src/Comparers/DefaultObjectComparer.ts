import equals from '../Utilities/equals.js';
import getHash from '../Utilities/getHash.js';
import DefaultStringComparer from './DefaultStringComparer.js';
import { IComparer, IEqualityComparer } from './_types.js';

/**
 * Default implementation
 */
 export default class DefaultObjectComparer<T extends any = any> implements IComparer<T>, IEqualityComparer<T> {
    public compare(x: T, y: T): number
    {
        const toStringMethodName = 'toString';
        const x_toString = x[toStringMethodName]?.call(x);
        const y_toString = y[toStringMethodName]?.call(y);

        if (x_toString !== undefined // if there is no toString(), lets serialize it with a hash
            && x_toString !== {}.toString() // if it is an object type, lets serialize it with a hash
            && y_toString !== undefined // if there is no toString(), lets serialize it with a hash
            && y_toString !== {}.toString()) // if it is an object type, lets serialize it with a hash
        {
            return new DefaultStringComparer().compare(x_toString, y_toString);
        }

        else
        {
            return new DefaultStringComparer().compare(getHash(x), getHash(y));
        }
    }

    public equals(x: T, y: T): boolean
    {
        return equals(x, y, true);
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

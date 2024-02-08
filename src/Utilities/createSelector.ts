import { Selector } from '../Types';
import isString from '../TypeHelpers/isString';
import isNumber from '../TypeHelpers/isNumber';
import isSymbol from '../TypeHelpers/isSymbol';

/**
 * Returns a Selector for the given type.
 */
export default function createSelector<T, R = T, K extends keyof T = keyof T>(propertyNameOrSelector: K | Selector<T, R>): Selector<T, R | T[K]>
{
    if (isString(propertyNameOrSelector) || isNumber(propertyNameOrSelector) || isSymbol(propertyNameOrSelector))
    {
        return (a: T) => a[propertyNameOrSelector];
    }
    else
    {
        return propertyNameOrSelector;
    }
}
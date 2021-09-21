import isString from '../TypeHelpers/isString';
import { Selector } from '../Types';

/**
 * Returns a Selector for the given type.
 */
export default function createSelector<T, R = T, K extends keyof T = keyof T>(propertyNameOrSelector: K | Selector<T, R>): Selector<T, R | T[K]>
{
    if (isString(propertyNameOrSelector))
    {
        return (a: T) => a[propertyNameOrSelector as string];
    }
    else
    {
        return propertyNameOrSelector as (a: T) => R;
    }
}
import { IEnumerable } from '../Enumerables/_types.js';
import isFunction from './isFunction.js';
import isUndefinedOrNull from './isUndefinedOrNull.js';



/**
 * quick type for readability
 */
 type NullOrEmptyableType =
    { length: number; }
    | { count: number; }
    | IEnumerable<any>
    | string
    | any[]
    | null
    | undefined;

/**
 * Returns true if the value is undefined, null or empty.
 * 
 * Also behaves as a type guard that will treat empty subjects as null|undefined.
 * 
 * @param subject 
 */
export default function isNullOrEmpty(subject?: NullOrEmptyableType): subject is null | undefined
{
    if (isUndefinedOrNull(subject))
    {
        return true;
    }
    if (subject['length'] === 0)
    {
        return true;
    }
    if (isFunction(subject['length']) && subject['length']() === 0)
    {
        return true;
    }
    if (subject['count'] === 0)
    {
        return true;
    }
    if (isFunction(subject['count']) && subject['count']() === 0)
    {
        return true;
    }
    return false;
}

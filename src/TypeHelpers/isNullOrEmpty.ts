import { IEnumerable } from '../Enumerables/_types';
import isFunction from './isFunction';
import isUndefinedOrNull from './isUndefinedOrNull';



/**
 * quick type for readability
 */
type NullOrEmptyableType =
    { length: number; }
    | { count: number; }
    | IEnumerable<unknown>
    | string
    | unknown[]
    | null
    | undefined;

type NullOrEmptyType =
    NullOrEmptyableType & { length: 0; }
    | NullOrEmptyableType & { count: 0; }
    | NullOrEmptyableType & IEnumerable<unknown> & { count(): () => 0; }
    | NullOrEmptyableType & unknown[]
    | NullOrEmptyableType & null
    | NullOrEmptyableType & undefined;

/**
 * Returns true if the value is undefined, null or empty.
 * 
 * NOTE: if you need empty, do this seperately 
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

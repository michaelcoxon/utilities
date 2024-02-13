import { IEnumerable } from '../Enumerables';
import isFunction from './isFunction';


/**
 * Notes:
 * 
 * Have tried to do Iterable but the problem is that in the
 * spec iterable has no guarantee that it is re-playable so
 * any type of iteration on it to see if it is empty will
 * move it next. 
 * 
 */
export type EmptyableType =
    { length: number; }
    | { count: number; }
    | IEnumerable<unknown>
    | string
    | unknown[];


export default function isEmpty(subject: EmptyableType): boolean
{
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
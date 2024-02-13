import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull';
import { empty } from '../../Utilities';
import { QueryStringItem } from '../_types';

export default function convert(name: string, value: unknown): QueryStringItem[]
{
    const result: QueryStringItem[] = [];

    if (!isUndefinedOrNull(value))
    {
        if (Array.isArray(value))
        {
            result.push(...convertArray(`${name}`, value));
        }
        else if (typeof value === 'object')
        {
            result.push(...convertObjectToQueryStringItem(value as Record<string, unknown>, `${name}.`));
        }
        else
        {
            result.push({
                name: name,
                value: value as string | number | boolean,
            });
        }
    }

    return result;
}

/**
 * Converts a `name=items[]` to a `name[index]=item` for a url query string.
 */
export function convertArray(name: string, arr: unknown[]): QueryStringItem[]
{
    const result: QueryStringItem[] = [];

    for (let i = 0; i < arr.length; i++)
    {
        const item = arr[i];

        result.push(...convert(`${name}[${i}]`, item));
    }

    return result;
}
/**
 * Converts and {@link Object} to a collection of {@link QueryStringItem}'s.
 * @param obj
 */
export function convertObjectToQueryStringItem(obj: Record<string, unknown>): QueryStringItem[];
/**
 * Converts and {@link Object} to a collection of {@link QueryStringItem}'s with the specified {@param prefix} for the key.
 * @param obj
 */
export function convertObjectToQueryStringItem(obj: Record<string, unknown>, prefix: string): QueryStringItem[];
export function convertObjectToQueryStringItem(obj: Record<string, unknown>, prefix: string = empty): QueryStringItem[]
{
    const result: QueryStringItem[] = [];

    for (const key in obj)
    {
        if (!isUndefinedOrNull(obj[key]))
        {
            result.push(...convert(`${prefix}${key}`, obj[key]));
        }
    }

    return result;
}

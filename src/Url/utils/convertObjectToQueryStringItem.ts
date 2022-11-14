import { empty } from '../../Strings/_consts.js';
import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull.js';
import { QueryStringItem } from '../_types.js';
import convert from "./convert.js";

/**
 * Converts and {@link Object} to a collection of {@link QueryStringItem}'s.
 * @param obj
 */
export default function convertObjectToQueryStringItem(obj: Record<string, any>): QueryStringItem[];
/**
 * Converts and {@link Object} to a collection of {@link QueryStringItem}'s with the specified {@param prefix} for the key.
 * @param obj
 */
export default function convertObjectToQueryStringItem(obj: Record<string, any>, prefix: string): QueryStringItem[];
export default function convertObjectToQueryStringItem(obj: Record<string, any>, prefix: string = empty): QueryStringItem[]
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

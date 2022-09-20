import { QueryStringItem } from '../_types';
import  buildObjectTree  from "./buildObjectTree";

/**
 * Converts a collection of {@link QueryStringItem}'s to an object
 * @param queryStringItems
 */
 export default function convertQueryStringItemToObject(queryStringItems: QueryStringItem[]): Record<string, any>
{
    const result = {};

    for (const item of queryStringItems)
    {
        buildObjectTree(result, item.name, item.value);
    }

    return result;
}

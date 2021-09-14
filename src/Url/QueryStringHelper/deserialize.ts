import { QueryStringItem } from './../Url.types';
import  parseValue  from "./parseValue";

/**
 * Deserializes a query string into an array of {@link QueryStringItem}'s
 * @param queryString The query string to deserialize
 * @returns {QueryStringItem[]} A collections of the items in the query string.
 */

 export default function deserialize(queryString: string): QueryStringItem[]
{
    let query = queryString;
    if (query.startsWith('?'))
    {
        query = query.substr(1);
    }

    const segments = query.split("&");
    return segments
        .map(s =>
        {
            const components = s.split('=', 2);
            return {
                name: components[0],
                value: parseValue(decodeURIComponent(components[1]))
            };
        });
}

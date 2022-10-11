import NotSupportedException from '../../Exceptions/NotSupportedException';
import trimStart from '../../Strings/trimStart';
import { QueryStringItem } from '../_types';
import parseQSIValue from "./parseQSIValue";

/**
 * Deserializes a query string into an array of {@link QueryStringItem}'s
 * @param queryString The query string to deserialize
 * @returns {QueryStringItem[]} A collections of the items in the query string.
 */

export default function deserializeQS(queryString: string): QueryStringItem[]
{
    if (queryString.length === 0)
    {
        return [];
    }

    queryString = trimStart(queryString, '?');

    const segments = queryString.split("&");
    return segments
        .map(deserializeQSParameter);
}

function deserializeQSParameter(segment: string, index: number, array: string[]): { name: string; value: string | number | boolean; }
{
    const components = segment.match(/([^=]+)(?:=(.*))/i);
    if (components?.length === 3)
    {
        return {
            name: components[1],
            value: parseQSIValue(decodeURIComponent(components[2]))
        };
    }
    else
    {
        throw new NotSupportedException(`Segment '${segment}' is an unsupported query string parameter.`);
    }
}


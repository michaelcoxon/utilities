import { empty } from '../../Strings/_consts';
import { QueryStringItem } from '../_types';

/**
 * Serializes a {@link QueryStringItem[]} to a query string. 
 * @param queryStringItems the {@link QueryStringItem[]} to serialize
 * @param useQuestionMark Prepend a question mark '?' when true.
 */
export default function serializeQueryStringItems(queryStringItems: QueryStringItem[], useQuestionMark = false): string
{
    if (queryStringItems.length == 0)
    {
        useQuestionMark = false;
    }

    return queryStringItems.length === 0 ? empty : (useQuestionMark ? '?' : empty) + queryStringItems
        .map(kvp => `${kvp.name}=${encodeURIComponent(kvp.value)}`)
        .join("&");;
}

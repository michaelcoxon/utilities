import { empty } from '../../Strings/_consts';
import { QueryStringItem } from './../Url.types';

/**
 * Serializes a collection of {@link QueryStringItem}'s to a query string without a prepended question mark
 * @param queryStringItems
 */
export default function serializeQueryStringItems(queryStringItems: QueryStringItem[]): string;
/**
 * Serializes a collection of {@link QueryStringItem}'s to a query string. Will prepend a question mark if {@param useQuestionMark} is true
 * @param queryStringItems
 */
export default function serializeQueryStringItems(queryStringItems: QueryStringItem[], useQuestionMark: boolean): string;
export default function serializeQueryStringItems(queryStringItems: QueryStringItem[], useQuestionMark = false): string
{
    if (queryStringItems.length == 0)
    {
        useQuestionMark = false;
    }

    return (useQuestionMark ? '?' : empty) + queryStringItems
        .map(kvp => `${kvp.name}=${encodeURIComponent(kvp.value)}`)
        .join("&");;
}

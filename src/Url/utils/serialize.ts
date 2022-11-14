/**
 * Serializes an {@link Object} to a query string without a prepended question mark
 * @param obj the {@link Object} to serialize
 */

import convertObjectToQueryStringItem from './convertObjectToQueryStringItem.js';
import  serializeQueryStringItems  from './serializeQueryStringItems.js';

/**
 * Serializes an {@link Object} to a query string. 
 * @param obj the {@link Object} to serialize
 * @param useQuestionMark Prepend a question mark '?' when true.
 */
export default function serialize(obj: Record<string, any>, useQuestionMark = false): string
{
    return serializeQueryStringItems(convertObjectToQueryStringItem(obj), useQuestionMark);
}
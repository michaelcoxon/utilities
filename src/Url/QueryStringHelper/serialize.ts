/**
 * Serializes an {@link Object} to a query string without a prepended question mark
 * @param obj the {@link Object} to serialize
 */

import convertObject from './convertObject';
import  serializeQueryStringItems  from './serializeQueryStringItems';

export default function serialize(obj: Record<string, unknown>): string;
/**
 * Serializes an {@link Object} to a query string. Will prepend a question mark if {@param useQuestionMark} is true
 * @param obj the {@link Object} to serialize
 */
export default function serialize(obj: Record<string, unknown>, useQuestionMark: boolean): string;
export default function serialize(obj: Record<string, unknown>, useQuestionMark = false): string
{
    return serializeQueryStringItems(convertObject(obj), useQuestionMark);
}
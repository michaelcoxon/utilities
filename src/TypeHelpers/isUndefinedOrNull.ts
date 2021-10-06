/**
 * Returns true if the subject in undefined or null
 * @param subject
 */

import isNull from './isNull';
import isUndefined from './isUndefined';

export default function isUndefinedOrNull<T>(subject: T | undefined | null): subject is undefined | null
{
    return isUndefined(subject) || isNull(subject);
}

import isEmpty, { EmptyableType } from './isEmpty';
import isUndefinedOrNull from './isUndefinedOrNull';

export type NullOrEmptyableType = EmptyableType | null | undefined;

/**
 * Returns true if the value is undefined, null or empty.
 * 
 * NOTE: if you need empty, use isEmpty 
 * 
 * @param subject 
 */
export default function isNullOrEmpty(subject?: NullOrEmptyableType): subject is null | undefined
{
    if (isUndefinedOrNull(subject))
    {
        return true;
    }
    return isEmpty(subject);
}
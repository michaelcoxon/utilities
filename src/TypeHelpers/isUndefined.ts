/**
 * Returns true if the subject is undefined
 * @param subject
 */

export default function isUndefined<T>(subject: T | undefined): subject is undefined
{
    return subject === undefined;
}

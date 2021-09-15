/**
 * Returns true if the subject is null
 * @param subject
 */

export default function isNull<T>(subject: T | null): subject is null
{
    return subject === null;
}

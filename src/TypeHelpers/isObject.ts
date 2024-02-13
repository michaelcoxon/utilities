/**
 * Returns true if the subject is a number
 * @param subject
 */

export default function isObject<T>(subject: T | Record<string, unknown>): subject is Record<string, unknown>
{
    return typeof subject === 'object';
}

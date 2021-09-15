/**
 * Returns true if the subject is a number
 * @param subject
 */

export default function isObject<T>(subject: T | Record<string, any>): subject is Record<string, any>
{
    return typeof subject === 'object';
}

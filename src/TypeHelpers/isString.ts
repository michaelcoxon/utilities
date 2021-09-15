/**
 * Returns true if the subject is a string
 * @param subject
 */

export default function isString<T>(subject: T | string): subject is string
{
    return typeof subject === 'string';
}

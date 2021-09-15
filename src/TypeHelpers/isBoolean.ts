/**
 * Returns true if the subject is a boolean
 * @param subject
 */

export default function isBoolean<T>(subject: T | boolean): subject is boolean
{
    return typeof subject === 'boolean';
}

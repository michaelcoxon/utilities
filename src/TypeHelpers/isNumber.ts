/**
 * Returns true if the subject is a number
 * @param subject
 */

export default function isNumber<T>(subject: T | number): subject is number
{
    return typeof subject === 'number';
}

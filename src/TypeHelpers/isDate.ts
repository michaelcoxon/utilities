/**
 * Returns true if the subject is a date
 * @param subject
 */

export default function isDate<T>(subject: T | Date): subject is Date
{
    return subject instanceof Date;
}

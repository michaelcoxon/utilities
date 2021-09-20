/**
 * Returns true if the subject is an array.
 * @param subject
 */

export default function isArray(subject: any): subject is any[]
{
    return Array.isArray(subject);
}

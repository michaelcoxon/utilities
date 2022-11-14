import { WHITESPACE } from './_consts.js';

/**
 * Returns true if the string is undefined, null or whitespace
 * @param str
 */

export default function isNullOrWhitespace(str?: string | null): str is null | undefined
{
    const regex = new RegExp(`^[${WHITESPACE}]+$`, 'g');
    return str === undefined || str === null || regex.test(str);
}

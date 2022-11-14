import escapeRegExp from './escapeRegExp.js';
import { WHITESPACE, empty } from './_consts.js';


/**
 * Trims the whitespace from the end of a string
 * @param str The string to trim
 */
export default function trimEnd(str: string): string;
/**
 * Trims the specified characters from the end of a string
 * @param str The string to trim
 * @param chars The set of characters to trim. This treats the characters
 *              individually and it will not work if you need to trim a
 *              specific string from the start/end.
 */
export default  function trimEnd(str: string, chars: string): string;
export default  function trimEnd(str: string, chars?: string): string
{
    if (chars !== undefined)
    {
        chars = escapeRegExp(chars);
    }

    else
    {
        chars = WHITESPACE;
    }
    const regex = new RegExp(`[${chars}]+$`, 'g');
    return str.replace(regex, empty);
}

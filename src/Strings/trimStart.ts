/**
 * Trims the whitespace from the start of a string
 * @param str The string to trim
 */

import escapeRegExp from './escapeRegExp.js';
import { empty, WHITESPACE } from './_consts.js';


export default function trimStart(str: string): string;
/**
 * Trims the specified characters from the start of a string
 * @param str The string to trim
 * @param chars The set of characters to trim. This treats the characters
 *              individually and it will not work if you need to trim a
 *              specific string from the start/end.
 */
 export default  function trimStart(str: string, chars: string): string;
 export  default function trimStart(str: string, chars?: string): string
 {
     if (chars !== undefined)
     {
         chars = escapeRegExp(chars);
     }
     else
     {
         chars = WHITESPACE;
     }
     const regex = new RegExp(`^[${chars}]+`, 'g');
     return str.replace(regex, empty);
 }
 
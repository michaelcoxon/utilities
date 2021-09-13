import { isUndefinedOrNull } from './TypeHelpers';
import Utilities from './Utilities';

const WHITESPACE = "\\s\\uFEFF\\xA0";
const EMPTY = '';
const NEW_LINE = "\n";
const FORMAT_REGEX = /{(\d+):?([^}]+)?}/g;
const ESCAPE_REGEX_SEARCH = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

namespace Strings
{
    /**
     * An empty string.
     */
    export const empty = EMPTY;
    /**
     * A new line.
     */
    export const newLine = NEW_LINE;

    export function firstCharToLowerCase(str: string): string
    {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    export function firstCharToUpperCase(str: string): string
    {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    export function format(format: string, ...args: any[]): string
    {
        return format.replace(FORMAT_REGEX, (match: string, index: string, format: string) =>
        {
            if (!Strings.isNullOrEmpty(format))
            {
                const arg = Utilities.convertToString(args[parseInt(index)], format);
                return !isUndefinedOrNull(arg)
                    ? arg
                    : empty;
            }
            else
            {
                const arg = Utilities.convertToString(args[parseInt(index)]);
                return !isUndefinedOrNull(arg)
                    ? arg
                    : empty;
            }
        });
    }

    export function padLeft(str: string, length: number, padding: string): string
    {
        let output = str;
        while (output.length < length)
        {
            output = padding + output;
        }
        return output;
    }

    /**
     * Trims the whitespace from the start and end of a string
     * @param str The string to trim
     */
    export function trim(str: string): string;
    /**
     * Trims the specified characters from the start and end of a string
     * @param str The string to trim
     * @param chars The set of characters to trim. This treats the characters
     *              individually and it will not work if you need to trim a
     *              specific string from the start/end.
     */
    export function trim(str: string, chars: string): string;
    export function trim(str: string, chars?: string): string
    {
        if (chars !== undefined)
        {
            chars = escapeRegExp(chars);
        }
        else
        {
            chars = WHITESPACE;
        }
        var regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
        return str.replace(regex, empty);
    }

    /**
     * Trims the whitespace from the start of a string
     * @param str The string to trim
     */
    export function trimStart(str: string): string;
    /**
     * Trims the specified characters from the start of a string
     * @param str The string to trim
     * @param chars The set of characters to trim. This treats the characters
     *              individually and it will not work if you need to trim a
     *              specific string from the start/end.
     */
    export function trimStart(str: string, chars: string): string;
    export function trimStart(str: string, chars?: string): string
    {
        if (chars !== undefined)
        {
            chars = escapeRegExp(chars);
        }
        else
        {
            chars = WHITESPACE;
        }
        var regex = new RegExp(`^[${chars}]+`, 'g');
        return str.replace(regex, empty);
    }

    /**
     * Trims the whitespace from the end of a string
     * @param str The string to trim
     */
    export function trimEnd(str: string): string;
    /**
     * Trims the specified characters from the end of a string
     * @param str The string to trim
     * @param chars The set of characters to trim. This treats the characters
     *              individually and it will not work if you need to trim a
     *              specific string from the start/end.
     */
    export function trimEnd(str: string, chars: string): string;
    export function trimEnd(str: string, chars?: string): string
    {
        if (chars !== undefined)
        {
            chars = escapeRegExp(chars);
        }
        else
        {
            chars = WHITESPACE;
        }
        var regex = new RegExp(`[${chars}]+$`, 'g');
        return str.replace(regex, empty);
    }

    /**
     * Returns true if the string is undefined, null or empty
     * @param str
     */
    export function isNullOrEmpty(str?: string | null): boolean
    {
        return str === undefined || str === null || str.length == 0;
    }

    /**
     * Returns true if the string is undefined, null or whitespace
     * @param str
     */
    export function isNullOrWhitespace(str?: string | null): boolean
    {
        var regex = new RegExp(`^[${WHITESPACE}]+$`, 'g');
        return str === undefined || str === null || regex.test(str);
    }

    /**
     * Returns all characters in the string as an array.
     * @param str
     */
    export function toCharArray(str: string): string[]
    {
        return str.split(empty);
    }

    function escapeRegExp(str: string): string
    {
        return str.replace(ESCAPE_REGEX_SEARCH, "\\$&");
    }
}

export default Strings;


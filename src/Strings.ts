
const WHITESPACE = "\\s\\uFEFF\\xA0";

export namespace Strings
{
    /**
     * An empty string.
     */
    export const empty = '';
    /**
     * A new line.
     */
    export const newLine = "\n";

    export function format(format: string, ...args: any[]): string
    {
        try
        {
            return format.replace(/{(\d+(:.*)?)}/g, (match, i) =>
            {
                var s = match.split(':');
                if (s.length > 1)
                {
                    i = i[0];
                    match = s[1].replace('}', empty);
                }

                var arg = convertToString(match, args[i]);
                return typeof arg != 'undefined' && arg != null ? arg : empty;
            });
        }
        catch (e)
        {
            return empty;
        }
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
            chars = escapeRegExp(chars)
        }
        else
        {
            chars = WHITESPACE
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
            chars = escapeRegExp(chars)
        }
        else
        {
            chars = WHITESPACE
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
            chars = escapeRegExp(chars)
        }
        else
        {
            chars = WHITESPACE
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

}

function escapeRegExp(str: string): string
{
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


function convertToString(match: string, arg: any): string
{
    if (typeof arg === 'string')
    {
        return formatString(match, arg);
    }
    if (typeof arg === 'number')
    {
        return formatNumber(match, arg);
    }

    // default
    return formatString(match, Strings.empty + arg);
}

function formatString(match: string, arg: string): string
{
    switch (match)
    {
        case 'L':
            arg = arg.toLowerCase();
            break;
        case 'U':
            arg = arg.toUpperCase();
            break;
        default:
            break;
    }

    return arg;
}

function formatNumber(match: string, arg: number): string
{
    switch (match.toLowerCase())
    {
        case 'f0':
            arg = parseInt(arg.toString());
            break;
        default:
            break;
    }

    return arg.toString();
}

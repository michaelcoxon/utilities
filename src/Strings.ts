const WHITESPACE = "\\s\\uFEFF\\xA0";

export interface DateConfiguration
{
    am: string,
    pm: string;
    timeSeparator: string;
    dateSeparator: string;
    months_Long: string[];
    months_Short: string[];
    daysOfWeek_Long: string[];
    daysOfWeek_Short: string[];
}

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
            return format.replace(/{(\d+):?([^}]+)?}/g, (match, index, pattern) =>
            {
                if (pattern !== undefined)
                {
                    var arg = convertToString(pattern, args[parseInt(index)]);
                    return arg !== undefined && arg !== null ? arg : empty;
                }
                else
                {
                    var arg = convertToString(match, args[parseInt(index)]);
                    return arg !== undefined && arg !== null ? arg : empty;
                }
            });
        }
        catch (e)
        {
            return empty;
        }
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
        if (arg instanceof Date)
        {
            return Dates.format(match, arg);
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
}

export namespace Dates
{
    const DefaultConfiguration: DateConfiguration = {
        am: "AM",
        pm: "PM",
        timeSeparator: ':',
        dateSeparator: '/',
        months_Long: [
            'January',
            'Feburary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        months_Short: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        daysOfWeek_Long: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        daysOfWeek_Short: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ],
    };

    const TOKEN_TO_STRING_DELEGATES: { [key: string]: (d: Date, config: DateConfiguration) => string } = {        "d": d => d.getDate().toString(),        "dd": d => Strings.padLeft(d.getDate().toString(), 2, '0'),        "ddd": (d, c) => c.daysOfWeek_Short[d.getDay()],        "dddd": (d, c) => c.daysOfWeek_Long[d.getDay()],        "f": d => Math.round(d.getMilliseconds() / 100).toString(),        "ff": d => Strings.padLeft(Math.round(d.getMilliseconds() / 10).toString(), 2, '0'),        "fff": d => Strings.padLeft(Math.round(d.getMilliseconds()).toString(), 3, '0'),        "F": d =>
        {            const value = Math.round(d.getMilliseconds() / 100);            return value > 0 ? value.toString() : Strings.empty        },        "FF": d =>
        {            const value = Math.round(d.getMilliseconds() / 10);            return value > 0 ? Strings.padLeft(value.toString(), 2, '0') : Strings.empty        },        "FFF": d =>
        {            const value = Math.round(d.getMilliseconds());            return value > 0 ? Strings.padLeft(value.toString(), 3, '0') : Strings.empty        },        "h": d => (d.getHours() % 12 || 12).toString(),        "hh": d => Strings.padLeft((d.getHours() % 12 || 12).toString(), 2, '0'),        "H": d => d.getHours().toString(),        "HH": d => Strings.padLeft(d.getHours().toString(), 2, '0'),        "K": (d, c) => getTimezoneHoursAndMinutesString(d.getTimezoneOffset(), c),        "m": d => d.getMinutes().toString(),        "mm": d => Strings.padLeft(d.getMinutes().toString(), 2, '0'),        "M": d => (d.getMonth() + 1).toString(),        "MM": d => Strings.padLeft((d.getMonth() + 1).toString(), 2, '0'),        "MMM": (d, c) => c.months_Short[d.getMonth()],        "MMMM": (d, c) => c.months_Long[d.getMonth()],        "s": d => d.getSeconds().toString(),        "ss": d => Strings.padLeft(d.getSeconds().toString(), 2, '0'),        "t": (d, c) => (d.getHours() < 12 ? c.am : c.pm)[0],        "tt": (d, c) => (d.getHours() < 12 ? c.am : c.pm),        "y": d => parseInt(d.getFullYear().toString().substr(-2)).toString(),        "yy": d => Strings.padLeft(parseInt(d.getFullYear().toString().substr(-2)).toString(), 2, '0'),        "yyy": d => Strings.padLeft(parseInt(d.getFullYear().toString().substr(-3)).toString(), 3, '0'),        "yyyy": d => Strings.padLeft(parseInt(d.getFullYear().toString().substr(-4)).toString(), 4, '0'),        "yyyyy": d => Strings.padLeft(parseInt(d.getFullYear().toString().substr(-5)).toString(), 5, '0'),        "z": (d, c) => getTimezoneHoursString(d.getTimezoneOffset(), c),        "zz": (d, c) => Strings.padLeft(getTimezoneHoursString(d.getTimezoneOffset(), c), 2, '0'),        "zzz": (d, c) => getTimezoneHoursAndMinutesString(d.getTimezoneOffset(), c),    };    export function getTimezoneHoursAndMinutesString(minutes: number, config: DateConfiguration): string
    {        let result = Strings.empty;        if (minutes < 0)
        {            result += "-";        }        else
        {            result += "+";        }        let dec = minutes / 60;        result += Strings.padLeft(Math.floor(dec).toString(), 2, '0');        result += config.timeSeparator;        result += Strings.padLeft(Math.round((dec - Math.floor(dec)) * 60).toString(), 2, '0');        return result;    }    export function getTimezoneHoursString(minutes: number, config: DateConfiguration): string
    {        let result = Strings.empty;        if (minutes < 0)
        {            result += "-";        }        else
        {            result += "+";        }        let dec = minutes / 60;        result += Math.floor(dec).toString();        return result;    }    export function format(format: string, date: Date): string
    {
        const tokens = Object.keys(TOKEN_TO_STRING_DELEGATES);
        tokens.sort((a, b) => b.length - a.length);

        let result = format;

        for (let token of tokens)
        {
            try
            {
                if (TOKEN_TO_STRING_DELEGATES[token] !== undefined)
                {
                    result = result.replace(token, TOKEN_TO_STRING_DELEGATES[token](date, DefaultConfiguration))
                }
            }
            catch
            {
                continue;
            }
        }

        return result;
    }}
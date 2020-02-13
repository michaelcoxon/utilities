import { isString, isNumber, isDate, isUndefinedOrNull } from './TypeHelpers';
import { FormatException } from './Exceptions';
import { StringBuilder } from './StringBuilder';

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
        return format.replace(/{(\d+):?([^}]+)?}/g, (match: string, index: string, format: string) =>
        {
            if (!Strings.isNullOrEmpty(format))
            {
                const arg = convertToString(args[parseInt(index)], format);
                return !isUndefinedOrNull(arg)
                    ? arg
                    : empty;
            }
            else
            {
                const arg = convertToString(args[parseInt(index)]);
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

    function convertToString(subject: {}, format: string = empty): string
    {
        if (isNumber(subject))
        {
            return new NumberFormatter().format(subject, format);
        }
        if (isDate(subject))
        {
            return new DateFormatter().format(subject, format);
        }

        // default and string
        return new StringFormatter().format(subject.toString(), format);
    }
}

export interface IDateFormatterConfiguration
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

export interface INumberFormatterConfiguration
{
    currencyFormat: string;
    currencyDecimalDigits: number;
    numberDecimalDigits: number;
    percentDecimalDigits: number;
}

export interface IFormatter<T>
{
    format(subject: T, format: string): string;
}

/** Formats strings */
export class StringFormatter implements IFormatter<string>
{
    public format(subject: string, format: string): string
    {
        if (Strings.isNullOrEmpty(format))
        {
            return subject;
        }
        else
        {
            switch (format)
            {
                case 'L': return subject.toLowerCase();
                case 'U': return subject.toUpperCase();

                default: throw new FormatException(`The format '${format}' is not implemented`);
            }
        }
    }
}

/** Formats numbers */
export class NumberFormatter implements IFormatter<number>
{
    private static readonly DefaultConfiguration: INumberFormatterConfiguration = {
        currencyFormat: "{1}${0}",
        currencyDecimalDigits: 2,
        numberDecimalDigits: 2,
        percentDecimalDigits: 2,
    };

    private readonly _delegates: NumberFormatterDelegates;

    constructor(numberFormatterDelegates: NumberFormatterDelegates = new NumberFormatterDelegates(NumberFormatter.DefaultConfiguration))
    {
        this._delegates = numberFormatterDelegates;
    }

    public format(subject: number, format: string): string
    {
        if (Strings.isNullOrEmpty(format))
        {
            return subject.toString();
        }
        else
        {
            const [specifier, precision] = [format.charAt(0), parseInt(format.slice(1)) || undefined];
            return this._getFormatter(specifier).call(this._delegates, subject, precision);
        }
    }

    private _getFormatter(specifier): (subject: number, precision?: number) => string
    {
        switch (specifier.toLowerCase())
        {
            case 'c': return this._delegates.formatCurrency;
            case 'd': return this._delegates.formatDecimal;
            case 'e': return this._delegates.formatExponential;
            case 'f': return this._delegates.formatFixed;
            case 'g': return this._delegates.formatGeneral;
            case 'n': return this._delegates.formatNumber;
            case 'p': return this._delegates.formatPercent;
            case 'x': return this._delegates.formatHexadecimal;

            default: throw new FormatException(`The format specifier '${specifier}' is not implemented`);
        }
    }
}

export class NumberFormatterDelegates
{
    private readonly _config: INumberFormatterConfiguration;

    constructor(numberFormatterConfiguration: INumberFormatterConfiguration)
    {
        this._config = numberFormatterConfiguration;
    }

    public formatCurrency(subject: number, precision: number = this._config.currencyDecimalDigits): string
    {
        return Strings.format(this._config.currencyFormat, this.formatFixed(Math.abs(subject), precision), subject < 0 ? "-" : "");
    }

    public formatDecimal(subject: number, minDigits: number = 0): string
    {
        if (subject < 0)
        {
            return `-${Strings.padLeft(Math.abs(subject).toFixed(0), minDigits, "0")}`;
        }
        else
        {
            return Strings.padLeft(subject.toFixed(0), minDigits, "0");
        }
    }

    public formatExponential(subject: number, precision: number = 6): string
    {
        return subject.toExponential(precision); 
    }

    public formatFixed(subject: number, precision: number = this._config.numberDecimalDigits): string
    {
        return subject.toFixed(precision);
    }

    public formatGeneral(subject: number, precision?: number): string
    {
        const fixed = this.formatFixed(subject, precision);
        const expon = this.formatExponential(subject, precision);

        return fixed.length <= expon.length
            ? fixed
            : expon;
    }

    public formatNumber(subject: number, precision: number = this._config.numberDecimalDigits): string
    {
        return this.formatFixed(subject, precision);
    }

    public formatPercent(subject: number, precision: number = this._config.percentDecimalDigits): string
    {
        return `${this.formatFixed(subject, precision)} %`;
    }

    public formatHexadecimal(subject: number, precision: number = 0): string
    {
        return Strings.padLeft(subject.toString(16), precision, "0");
    }
}

export class DateFormatter implements IFormatter<Date>
{
    private static readonly DefaultConfiguration: IDateFormatterConfiguration = {
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

    private static readonly TOKEN_TO_STRING_DELEGATES: { [key: string]: (d: Date, config: IDateFormatterConfiguration) => string } = {
        "d": d => d.getDate().toString(),
        "dd": d => Strings.padLeft(d.getDate().toString(), 2, '0'),
        "ddd": (d, c) => c.daysOfWeek_Short[d.getDay()],
        "dddd": (d, c) => c.daysOfWeek_Long[d.getDay()],
        "f": d => Math.round(d.getMilliseconds() / 100).toString(),
        "ff": d => Strings.padLeft(Math.round(d.getMilliseconds() / 10).toString(), 2, '0'),
        "fff": d => Strings.padLeft(Math.round(d.getMilliseconds()).toString(), 3, '0'),
        "F": d =>
        {
            const value = Math.round(d.getMilliseconds() / 100);
            return value > 0 ? value.toString() : Strings.empty
        },
        "FF": d =>
        {
            const value = Math.round(d.getMilliseconds() / 10);
            return value > 0 ? Strings.padLeft(value.toString(), 2, '0') : Strings.empty
        },
        "FFF": d =>
        {
            const value = Math.round(d.getMilliseconds());
            return value > 0 ? Strings.padLeft(value.toString(), 3, '0') : Strings.empty
        },
        "h": d => (d.getHours() % 12 || 12).toString(),
        "hh": d => Strings.padLeft((d.getHours() % 12 || 12).toString(), 2, '0'),
        "H": d => d.getHours().toString(),
        "HH": d => Strings.padLeft(d.getHours().toString(), 2, '0'),
        "K": (d, c) => DateFormatter._getTimezoneHoursAndMinutesString(d.getTimezoneOffset(), c),
        "m": d => d.getMinutes().toString(),
        "mm": d => Strings.padLeft(d.getMinutes().toString(), 2, '0'),
        "M": d => (d.getMonth() + 1).toString(),
        "MM": d => Strings.padLeft((d.getMonth() + 1).toString(), 2, '0'),
        "MMM": (d, c) => c.months_Short[d.getMonth()],
        "MMMM": (d, c) => c.months_Long[d.getMonth()],
        "s": d => d.getSeconds().toString(),
        "ss": d => Strings.padLeft(d.getSeconds().toString(), 2, '0'),
        "t": (d, c) => (d.getHours() < 12 ? c.am : c.pm)[0],
        "tt": (d, c) => (d.getHours() < 12 ? c.am : c.pm),
        "y": d => parseInt(d.getFullYear().toString().substr(-2)).toString(),
        "yy": d => Strings.padLeft(parseInt(d.getFullYear().toString().substr(-2)).toString(), 2, '0'),
        "yyy": d => Strings.padLeft(parseInt(d.getFullYear().toString().substr(-3)).toString(), 3, '0'),
        "yyyy": d => Strings.padLeft(parseInt(d.getFullYear().toString().substr(-4)).toString(), 4, '0'),
        "yyyyy": d => Strings.padLeft(parseInt(d.getFullYear().toString().substr(-5)).toString(), 5, '0'),
        "z": (d, c) => DateFormatter._getTimezoneHoursString(d.getTimezoneOffset(), c),
        "zz": (d, c) => Strings.padLeft(DateFormatter._getTimezoneHoursString(d.getTimezoneOffset(), c), 2, '0'),
        "zzz": (d, c) => DateFormatter._getTimezoneHoursAndMinutesString(d.getTimezoneOffset(), c),
    };

    private readonly _config: IDateFormatterConfiguration;

    constructor(dateFormatterConfiguration: IDateFormatterConfiguration = DateFormatter.DefaultConfiguration)
    {
        this._config = dateFormatterConfiguration;
    }

    public format(subject: Date, format: string): string
    {
        const tokens = Object.keys(DateFormatter.TOKEN_TO_STRING_DELEGATES);

        const matcher = /([a-z]+)/ig;

        const result = format.replace(matcher, (token: string) =>
        {
            if (tokens.indexOf(token) > -1)
            {
                return DateFormatter.TOKEN_TO_STRING_DELEGATES[token](subject, this._config);
            }
            return token;
        });

        return result;
    }

    private static _getTimezoneHoursAndMinutesString(minutes: number, config: IDateFormatterConfiguration): string
    {
        let result = Strings.empty;

        if (minutes < 0)
        {
            result += "-";
        }
        else
        {
            result += "+";
        }

        let dec = minutes / 60;

        result += Strings.padLeft(Math.floor(dec).toString(), 2, '0');
        result += config.timeSeparator;
        result += Strings.padLeft(Math.round((dec - Math.floor(dec)) * 60).toString(), 2, '0');

        return result;
    }

    private static _getTimezoneHoursString(minutes: number, config: IDateFormatterConfiguration): string
    {
        let result = Strings.empty;

        if (minutes < 0)
        {
            result += "-";
        }
        else
        {
            result += "+";
        }

        let dec = minutes / 60;

        result += Math.floor(dec).toString();

        return result;
    }
}


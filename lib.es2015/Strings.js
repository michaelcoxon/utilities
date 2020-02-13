"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeHelpers_1 = require("./TypeHelpers");
const Exceptions_1 = require("./Exceptions");
const WHITESPACE = "\\s\\uFEFF\\xA0";
var Strings;
(function (Strings) {
    /**
     * An empty string.
     */
    Strings.empty = '';
    /**
     * A new line.
     */
    Strings.newLine = "\n";
    function firstCharToLowerCase(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
    Strings.firstCharToLowerCase = firstCharToLowerCase;
    function firstCharToUpperCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    Strings.firstCharToUpperCase = firstCharToUpperCase;
    function format(format, ...args) {
        return format.replace(/{(\d+):?([^}]+)?}/g, (match, index, format) => {
            if (!Strings.isNullOrEmpty(format)) {
                const arg = convertToString(args[parseInt(index)], format);
                return !TypeHelpers_1.isUndefinedOrNull(arg)
                    ? arg
                    : Strings.empty;
            }
            else {
                const arg = convertToString(args[parseInt(index)]);
                return !TypeHelpers_1.isUndefinedOrNull(arg)
                    ? arg
                    : Strings.empty;
            }
        });
    }
    Strings.format = format;
    function padLeft(str, length, padding) {
        let output = str;
        while (output.length < length) {
            output = padding + output;
        }
        return output;
    }
    Strings.padLeft = padLeft;
    function trim(str, chars) {
        if (chars !== undefined) {
            chars = escapeRegExp(chars);
        }
        else {
            chars = WHITESPACE;
        }
        var regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
        return str.replace(regex, Strings.empty);
    }
    Strings.trim = trim;
    function trimStart(str, chars) {
        if (chars !== undefined) {
            chars = escapeRegExp(chars);
        }
        else {
            chars = WHITESPACE;
        }
        var regex = new RegExp(`^[${chars}]+`, 'g');
        return str.replace(regex, Strings.empty);
    }
    Strings.trimStart = trimStart;
    function trimEnd(str, chars) {
        if (chars !== undefined) {
            chars = escapeRegExp(chars);
        }
        else {
            chars = WHITESPACE;
        }
        var regex = new RegExp(`[${chars}]+$`, 'g');
        return str.replace(regex, Strings.empty);
    }
    Strings.trimEnd = trimEnd;
    /**
     * Returns true if the string is undefined, null or empty
     * @param str
     */
    function isNullOrEmpty(str) {
        return str === undefined || str === null || str.length == 0;
    }
    Strings.isNullOrEmpty = isNullOrEmpty;
    /**
     * Returns true if the string is undefined, null or whitespace
     * @param str
     */
    function isNullOrWhitespace(str) {
        var regex = new RegExp(`^[${WHITESPACE}]+$`, 'g');
        return str === undefined || str === null || regex.test(str);
    }
    Strings.isNullOrWhitespace = isNullOrWhitespace;
    /**
     * Returns all characters in the string as an array.
     * @param str
     */
    function toCharArray(str) {
        return str.split(Strings.empty);
    }
    Strings.toCharArray = toCharArray;
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    function convertToString(subject, format = Strings.empty) {
        if (TypeHelpers_1.isNumber(subject)) {
            return new NumberFormatter().format(subject, format);
        }
        if (TypeHelpers_1.isDate(subject)) {
            return new DateFormatter().format(subject, format);
        }
        // default and string
        return new StringFormatter().format(subject.toString(), format);
    }
})(Strings = exports.Strings || (exports.Strings = {}));
/** Formats strings */
class StringFormatter {
    format(subject, format) {
        if (Strings.isNullOrEmpty(format)) {
            return subject;
        }
        else {
            switch (format) {
                case 'L': return subject.toLowerCase();
                case 'U': return subject.toUpperCase();
                default: throw new Exceptions_1.FormatException(`The format '${format}' is not implemented`);
            }
        }
    }
}
exports.StringFormatter = StringFormatter;
/** Formats numbers */
class NumberFormatter {
    constructor(numberFormatterDelegates = new NumberFormatterDelegates(NumberFormatter.DefaultConfiguration)) {
        this._delegates = numberFormatterDelegates;
    }
    format(subject, format) {
        if (Strings.isNullOrEmpty(format)) {
            return subject.toString();
        }
        else {
            const [specifier, precision] = [format.charAt(0), parseInt(format.slice(1)) || undefined];
            return this._getFormatter(specifier).call(this._delegates, subject, precision);
        }
    }
    _getFormatter(specifier) {
        switch (specifier.toLowerCase()) {
            case 'c': return this._delegates.formatCurrency;
            case 'd': return this._delegates.formatDecimal;
            case 'e': return this._delegates.formatExponential;
            case 'f': return this._delegates.formatFixed;
            case 'g': return this._delegates.formatGeneral;
            case 'n': return this._delegates.formatNumber;
            case 'p': return this._delegates.formatPercent;
            case 'x': return this._delegates.formatHexadecimal;
            default: throw new Exceptions_1.FormatException(`The format specifier '${specifier}' is not implemented`);
        }
    }
}
NumberFormatter.DefaultConfiguration = {
    currencyFormat: "${0}",
    currencyDecimalDigits: 2,
    numberDecimalDigits: 2,
    percentDecimalDigits: 2,
};
exports.NumberFormatter = NumberFormatter;
class NumberFormatterDelegates {
    constructor(numberFormatterConfiguration) {
        this._config = numberFormatterConfiguration;
    }
    formatCurrency(subject, precision = this._config.currencyDecimalDigits) {
        return Strings.format(this._config.currencyFormat, this.formatFixed(subject, precision));
    }
    formatDecimal(subject, minDigits = 0) {
        if (subject < 0) {
            return `-${Strings.padLeft(Math.abs(subject).toFixed(0), minDigits, "0")}`;
        }
        else {
            return Strings.padLeft(subject.toFixed(0), minDigits, "0");
        }
    }
    formatExponential(subject, precision = 6) {
        return subject.toExponential(precision);
    }
    formatFixed(subject, precision = this._config.numberDecimalDigits) {
        return subject.toFixed(precision);
    }
    formatGeneral(subject, precision) {
        const fixed = this.formatFixed(subject, precision);
        const expon = this.formatExponential(subject, precision);
        return fixed.length <= expon.length
            ? fixed
            : expon;
    }
    formatNumber(subject, precision = this._config.numberDecimalDigits) {
        return this.formatFixed(subject, precision);
    }
    formatPercent(subject, precision = this._config.percentDecimalDigits) {
        return `${this.formatFixed(subject, precision)} %`;
    }
    formatHexadecimal(subject, precision = 0) {
        return Strings.padLeft(subject.toString(16), precision, "0");
    }
}
exports.NumberFormatterDelegates = NumberFormatterDelegates;
class DateFormatter {
    constructor(dateFormatterConfiguration = DateFormatter.DefaultConfiguration) {
        this._config = dateFormatterConfiguration;
    }
    format(subject, format) {
        const tokens = Object.keys(DateFormatter.TOKEN_TO_STRING_DELEGATES);
        tokens.sort((a, b) => b.length - a.length);
        let result = format;
        for (let token of tokens) {
            try {
                if (DateFormatter.TOKEN_TO_STRING_DELEGATES[token] !== undefined) {
                    result = result.replace(token, DateFormatter.TOKEN_TO_STRING_DELEGATES[token](subject, this._config));
                }
            }
            catch (_a) {
                continue;
            }
        }
        return result;
    }
    static _getTimezoneHoursAndMinutesString(minutes, config) {
        let result = Strings.empty;
        if (minutes < 0) {
            result += "-";
        }
        else {
            result += "+";
        }
        let dec = minutes / 60;
        result += Strings.padLeft(Math.floor(dec).toString(), 2, '0');
        result += config.timeSeparator;
        result += Strings.padLeft(Math.round((dec - Math.floor(dec)) * 60).toString(), 2, '0');
        return result;
    }
    static _getTimezoneHoursString(minutes, config) {
        let result = Strings.empty;
        if (minutes < 0) {
            result += "-";
        }
        else {
            result += "+";
        }
        let dec = minutes / 60;
        result += Math.floor(dec).toString();
        return result;
    }
}
DateFormatter.DefaultConfiguration = {
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
DateFormatter.TOKEN_TO_STRING_DELEGATES = {
    "d": d => d.getDate().toString(),
    "dd": d => Strings.padLeft(d.getDate().toString(), 2, '0'),
    "ddd": (d, c) => c.daysOfWeek_Short[d.getDay()],
    "dddd": (d, c) => c.daysOfWeek_Long[d.getDay()],
    "f": d => Math.round(d.getMilliseconds() / 100).toString(),
    "ff": d => Strings.padLeft(Math.round(d.getMilliseconds() / 10).toString(), 2, '0'),
    "fff": d => Strings.padLeft(Math.round(d.getMilliseconds()).toString(), 3, '0'),
    "F": d => {
        const value = Math.round(d.getMilliseconds() / 100);
        return value > 0 ? value.toString() : Strings.empty;
    },
    "FF": d => {
        const value = Math.round(d.getMilliseconds() / 10);
        return value > 0 ? Strings.padLeft(value.toString(), 2, '0') : Strings.empty;
    },
    "FFF": d => {
        const value = Math.round(d.getMilliseconds());
        return value > 0 ? Strings.padLeft(value.toString(), 3, '0') : Strings.empty;
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
exports.DateFormatter = DateFormatter;
//# sourceMappingURL=Strings.js.map
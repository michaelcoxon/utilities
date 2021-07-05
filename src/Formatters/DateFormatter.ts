import Strings from '../Strings';
import { IFormatter, IDateFormatterConfiguration } from './_types';


export  default class DateFormatter implements IFormatter<Date>
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

    private static readonly TOKEN_TO_STRING_DELEGATES: { [key: string]: (d: Date, config: IDateFormatterConfiguration) => string; } = {
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
            return value > 0 ? value.toString() : Strings.empty;
        },
        "FF": d =>
        {
            const value = Math.round(d.getMilliseconds() / 10);
            return value > 0 ? Strings.padLeft(value.toString(), 2, '0') : Strings.empty;
        },
        "FFF": d =>
        {
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

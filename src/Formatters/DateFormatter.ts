import padLeft from '../Strings/padLeft';
import { empty } from '../Strings/_consts';
import { IFormatter, IDateFormatterConfiguration } from './_types';
import * as DefaultConfiguration from './en-au.DateFormatterConfiguration.json';

export default class DateFormatter implements IFormatter<Date>
{
    readonly #config: IDateFormatterConfiguration;

    constructor(dateFormatterConfiguration: IDateFormatterConfiguration = DefaultConfiguration)
    {
        this.#config = dateFormatterConfiguration;
    }

    public format(subject: Date, format: string): string
    {
        const tokens = Object.keys(TOKEN_TO_STRING_DELEGATES);

        const matcher = /([a-z]+)/ig;

        const result = format.replace(matcher, (token: string) =>
        {
            if (tokens.indexOf(token) > -1)
            {
                return TOKEN_TO_STRING_DELEGATES[token](subject, this.#config);
            }
            return token;
        });

        return result;
    }
}

const TOKEN_TO_STRING_DELEGATES: Record<string, (d: Date, config: IDateFormatterConfiguration) => string> = {
    "d": d => d.getDate().toString(),
    "dd": d => padLeft(d.getDate().toString(), 2, '0'),
    "ddd": (d, c) => c.daysOfWeek_Short[d.getDay()],
    "dddd": (d, c) => c.daysOfWeek_Long[d.getDay()],
    "f": d => Math.round(d.getMilliseconds() / 100).toString(),
    "ff": d => padLeft(Math.round(d.getMilliseconds() / 10).toString(), 2, '0'),
    "fff": d => padLeft(Math.round(d.getMilliseconds()).toString(), 3, '0'),
    "F": d =>
    {
        const value = Math.round(d.getMilliseconds() / 100);
        return value > 0 ? value.toString() : empty;
    },
    "FF": d =>
    {
        const value = Math.round(d.getMilliseconds() / 10);
        return value > 0 ? padLeft(value.toString(), 2, '0') : empty;
    },
    "FFF": d =>
    {
        const value = Math.round(d.getMilliseconds());
        return value > 0 ? padLeft(value.toString(), 3, '0') : empty;
    },
    "h": d => (d.getHours() % 12 || 12).toString(),
    "hh": d => padLeft((d.getHours() % 12 || 12).toString(), 2, '0'),
    "H": d => d.getHours().toString(),
    "HH": d => padLeft(d.getHours().toString(), 2, '0'),
    "K": (d, c) => getTimezoneHoursAndMinutesString(d.getTimezoneOffset(), c),
    "m": d => d.getMinutes().toString(),
    "mm": d => padLeft(d.getMinutes().toString(), 2, '0'),
    "M": d => (d.getMonth() + 1).toString(),
    "MM": d => padLeft((d.getMonth() + 1).toString(), 2, '0'),
    "MMM": (d, c) => c.months_Short[d.getMonth()],
    "MMMM": (d, c) => c.months_Long[d.getMonth()],
    "s": d => d.getSeconds().toString(),
    "ss": d => padLeft(d.getSeconds().toString(), 2, '0'),
    "t": (d, c) => (d.getHours() < 12 ? c.am : c.pm)[0],
    "tt": (d, c) => (d.getHours() < 12 ? c.am : c.pm),
    "y": d => parseInt(d.getFullYear().toString().substr(-2)).toString(),
    "yy": d => padLeft(parseInt(d.getFullYear().toString().substr(-2)).toString(), 2, '0'),
    "yyy": d => padLeft(parseInt(d.getFullYear().toString().substr(-3)).toString(), 3, '0'),
    "yyyy": d => padLeft(parseInt(d.getFullYear().toString().substr(-4)).toString(), 4, '0'),
    "yyyyy": d => padLeft(parseInt(d.getFullYear().toString().substr(-5)).toString(), 5, '0'),
    "z": (d) => getTimezoneHoursString(d.getTimezoneOffset()),
    "zz": (d) => padLeft(getTimezoneHoursString(d.getTimezoneOffset()), 2, '0'),
    "zzz": (d, c) => getTimezoneHoursAndMinutesString(d.getTimezoneOffset(), c),
};


function getTimezoneHoursAndMinutesString(minutes: number, config: IDateFormatterConfiguration)
{
    let result = empty;

    if (minutes < 0)
    {
        result += "-";
    }

    else
    {
        result += "+";
    }

    const dec = minutes / 60;

    result += padLeft(Math.floor(dec).toString(), 2, '0');
    result += config.timeSeparator;
    result += padLeft(Math.round((dec - Math.floor(dec)) * 60).toString(), 2, '0');

    return result;
};

function getTimezoneHoursString(minutes: number) 
{
    let result = empty;

    if (minutes < 0)
    {
        result += "-";
    }

    else
    {
        result += "+";
    }

    const dec = minutes / 60;

    result += Math.floor(dec).toString();

    return result;
}

import padLeft from '../Strings/padLeft';
import { empty } from '../Strings/_consts';
import { IFormatter, IDateFormatterConfiguration } from './_types';
import * as DefaultConfiguration from '../i18n/en.DateFormatterConfiguration.strings.json';

type DateToken = 'd' | 'dd' | 'ddd' | 'dddd' | 'f' | 'ff' | 'fff' | 'F' | 'FF' | 'FFF' | 'h' | 'hh' | 'H' | 'HH' | 'K' | 'm' | 'mm' | 'M' | 'MM' | 'MMM' | 'MMMM' | 's' | 'ss' | 't' | 'tt' | 'y' | 'yy' | 'yyy' | 'yyyy' | 'yyyyy' | 'z' | 'zz' | 'zzz';
type DateDelegate = (date: Date, config: IDateFormatterConfiguration, format: (subject: Date, format: string) => string) => string;

const delegates = createDelegates();
const tokens = Object.keys(delegates).sort((a, b) => a.length - b.length).reverse() as Array<DateToken>;

const matcher = /([a-z]+)/ig;
// same as line above
//const matcher = new RegExp(`([a-z]+)`, "ig");

// this doesn't work cause it changes letters in the nontokens. need to somehow seperate 'words'
//const matcher = new RegExp(`(${tokens.join('|')})`, "ig");

export default class DateFormatter implements IFormatter<Date>
{
    readonly #config: IDateFormatterConfiguration;

    constructor();
    constructor(dateFormatterConfiguration: Partial<IDateFormatterConfiguration>);
    constructor(dateFormatterConfiguration: Partial<IDateFormatterConfiguration> = {})
    {
        this.#config = Object.assign({}, DefaultConfiguration, dateFormatterConfiguration);
    }

    public format(subject: Date, format: string): string
    {
        return format.replace(matcher, (match: string): any =>
        {
            if (tokens.indexOf(match as DateToken) > -1)
            {
                const token = match as DateToken;
                const tokenDelegate = delegates[token];

                return tokenDelegate(subject, this.#config, (s: Date, f: string) =>
                {
                    return this.format(s, f);
                });
            }
            // don't replace
            return match;
        });
    }
}

function createDelegates(): { [token in DateToken]: DateDelegate; }
{
    return {
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
}

function getTimezoneHoursAndMinutesString(minutes: number, config: IDateFormatterConfiguration): string
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

    const hours = minutes / 60;

    // hours
    result += padLeft(Math.floor(hours).toString(), 2, '0');
    // sep
    result += config.timeSeparator;
    // remainder minutes
    result += padLeft(Math.round((hours - Math.floor(hours)) * 60).toString(), 2, '0');

    return result;
};

function getTimezoneHoursString(minutes: number): string 
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

import padLeft from '../../Strings/padLeft.js';
import { empty } from '../../Strings/_consts.js';
import { IDateFormatterConfiguration } from '../_types.js';
import { getTimezoneHoursAndMinutesString } from './getTimezoneHoursAndMinutesString.js';
import { getTimezoneHoursString } from './getTimezoneHoursString.js';

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


export default TOKEN_TO_STRING_DELEGATES;



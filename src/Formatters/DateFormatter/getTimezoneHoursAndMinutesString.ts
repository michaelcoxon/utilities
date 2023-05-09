import padLeft from '../../Strings/padLeft';
import { empty } from '../../Strings/_consts';
import { IDateFormatterConfiguration } from '../_types';

export function getTimezoneHoursAndMinutesString(minutes: number, config: IDateFormatterConfiguration)
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
}

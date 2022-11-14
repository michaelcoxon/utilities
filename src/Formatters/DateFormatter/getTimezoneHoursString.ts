import { empty } from '../../Strings/_consts.js';

export function getTimezoneHoursString(minutes: number)
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

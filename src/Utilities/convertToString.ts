import NumberFormatter from '../Formatters/NumberFormatter.js';
import StringFormatter from '../Formatters/StringFormatter.js';
import { empty } from '../Strings/_consts.js';
import isNumber from '../TypeHelpers/isNumber.js';
import isDate from '../TypeHelpers/isDate.js';
import DateFormatter from '../Formatters/DateFormatter/DateFormatter.js';


export default function convertToString(subject: any, format: string = empty): string
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
    return new StringFormatter().format(`${subject}`, format);
}

import NumberFormatter from '../Formatters/NumberFormatter';
import DateFormatter from '../Formatters/DateFormatter';
import StringFormatter from '../Formatters/StringFormatter';
import { empty } from '../Strings/_consts';
import isNumber from '../TypeHelpers/isNumber';
import isDate from '../TypeHelpers/isDate';


export default function convertToString(subject: unknown, format: string = empty): string
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

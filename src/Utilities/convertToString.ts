import NumberFormatter from '../Formatters/NumberFormatter';
import StringFormatter from '../Formatters/StringFormatter';
import { empty } from '../Strings/_consts';
import isNumber from '../TypeHelpers/isNumber';
import isDate from '../TypeHelpers/isDate';
import DateFormatter from '../Formatters/DateFormatter/DateFormatter';


export default function convertToString(subject: any, format: string = empty): string
{
    if (isNumber(subject))
    {
        return new NumberFormatter(convertToString).format(subject, format);
    }
    if (isDate(subject)) 
    {
        return new DateFormatter().format(subject, format);
    }

    // default and string
    return new StringFormatter().format(`${subject}`, format);
}

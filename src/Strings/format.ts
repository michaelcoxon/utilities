import { FORMAT_REGEX, empty } from './_consts';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import convertToString from '../Utilities/convertToString';
import isNullOrEmpty from '../TypeHelpers/isNullOrEmpty';


export default function format(format: string, ...args: any[]): string
{
    return format.replace(FORMAT_REGEX, (match: string, index: string, format: string) =>
    {
        if (!isNullOrEmpty(format))
        {
            const arg = convertToString(args[parseInt(index)], format);
            return !isUndefinedOrNull(arg)
                ? arg
                : empty;
        }

        else
        {
            const arg = convertToString(args[parseInt(index)]);
            return !isUndefinedOrNull(arg)
                ? arg
                : empty;
        }
    });
}

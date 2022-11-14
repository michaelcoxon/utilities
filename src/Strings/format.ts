import { FORMAT_REGEX, empty } from './_consts.js';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull.js';
import convertToString from '../Utilities/convertToString.js';
import isNullOrEmpty from '../TypeHelpers/isNullOrEmpty.js';


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

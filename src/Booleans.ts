import NotSupportedException from "./Exceptions/NotSupportedException";
import Result, { IResult } from "./Result";

const TRUE_STRING: string = (true).toString();
const FALSE_STRING: string = (false).toString();

const _caseInsensitiveTrueString = TRUE_STRING.toLowerCase();
const _caseInsensitiveFalseString = FALSE_STRING.toLowerCase();

namespace Booleans
{
    export const trueString = TRUE_STRING;
    export const falseString = FALSE_STRING;

    export function parse(value: string): boolean;
    export function parse(value: string, caseInsensitive: boolean): boolean;
    export function parse(value: string, caseInsensitive: boolean = false): boolean
    {
        const result = tryParse(value, caseInsensitive);
        if (result.success)
        {
            return result.value!;
        }
        else
        {
            throw new NotSupportedException(result.error);
        }
    }

    export function tryParse(value: string): IResult<boolean>;
    export function tryParse(value: string, caseInsensitive: boolean): IResult<boolean>;
    export function tryParse(value: string, caseInsensitive: boolean = false): IResult<boolean>
    {
        value = (caseInsensitive ? value.toLowerCase() : value);

        if (value.startsWith(caseInsensitive ? _caseInsensitiveTrueString : trueString))
        {
            return Result.ok(true);
        }
        else if (value.startsWith(caseInsensitive ? _caseInsensitiveFalseString : falseString))
        {
            return Result.ok(false);
        }
        else
        {
            return Result.fail(`Value is not a boolean. value: ${value} (${caseInsensitive ? "case-insensitive" : "case-sensitive"})`);
        }
    }
}

export default Booleans;

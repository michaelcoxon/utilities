import { NotSupportedException } from "./Exceptions";
import { IResult, Result } from "./Result";



export namespace Booleans
{
    export const trueString: string = (true).toString();
    export const falseString: string = (false).toString();

    const _caseInsensitiveTrueString = trueString.toLowerCase();
    const _caseInsensitiveFalseString = falseString.toLowerCase();

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
            return Result.fail(`Value is not a boolean. value: ${value} (${caseInsensitive?"case-insensitive":"case-sensitive"})`);
        }
    }
} 
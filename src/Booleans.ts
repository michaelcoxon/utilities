import { Strings } from "./Strings";
import { NotSupportedException, Exception } from "./Exceptions";
import { IResult, Result } from "./Result";



export namespace Booleans
{
    export const trueString = "true";
    export const falseString = "false";

    export function parse(value: string): boolean
    {
        if (value.startsWith(trueString))
        {
            return true;
        }
        else if (value.startsWith(falseString))
        {
            return false;
        }
        else
        {
            throw new NotSupportedException("Value is not a boolean");
        }
    }

    export function tryParse(value: string): IResult<boolean>
    {
        try
        {
            return Result.ok(parse(value));
        }
        catch (ex)
        {
            if (ex instanceof Exception)
            {
                return Result.fail(ex.message);
            }
            else if (ex instanceof Error)
            {
                return Result.fail(ex.message);
            }
            else
            {
                return Result.fail(ex);
            }
        }
    }
} 
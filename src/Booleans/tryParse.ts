import Result from '../Result/Result';
import { IResult } from '../Result/_types';
import { _caseInsensitiveTrueString, trueString, _caseInsensitiveFalseString, falseString } from './_consts';

export default function tryParse(value: string): IResult<boolean>;
export default function tryParse(value: string, caseInsensitive: boolean): IResult<boolean>;
export default function tryParse(value: string, caseInsensitive = false): IResult<boolean>
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

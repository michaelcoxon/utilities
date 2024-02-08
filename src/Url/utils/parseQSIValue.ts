import { tryParse } from '../../Booleans';
import { empty } from '../../Strings';
import trim from '../../Strings/trim';
import isNullOrEmpty from '../../TypeHelpers/isNullOrEmpty';

const TEST_INTEGER_REGEX = /^\d+$/;
const TEST_FLOAT_REGEX = /^\d+.\d+$/;

export default function parseQSIValue(value: string): string | number | boolean
{
    value = trim(value);
    //
    // null or empty
    //
    if (isNullOrEmpty(value))
    {
        return empty;
    }
    //
    // booleans
    //
    const bResult = tryParse(value, true);
    if (bResult.success)
    {
        // this can't be null so that is why i bang it.
        return bResult.value!;
    }
    // 
    // integer
    //
    else if (TEST_INTEGER_REGEX.test(value))
    {
        return parseInt(value);
    }
    // 
    // float
    //
    else if (TEST_FLOAT_REGEX.test(value))
    {
        return parseFloat(value);
    }
    // 
    // string
    //
    else
    {
        return value;
    }
}

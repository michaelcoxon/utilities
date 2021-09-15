import NotSupportedException from "../Exceptions/NotSupportedException";
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import tryParse from './tryParse';

export default function parse(value: string): boolean;
export default function parse(value: string, caseInsensitive: boolean): boolean;
export default function parse(value: string, caseInsensitive = false): boolean
{
    const result = tryParse(value, caseInsensitive);
    if (result.success && !isUndefinedOrNull(result.value))
    {
        return result.value;
    }

    else
    {
        throw new NotSupportedException(result.error);
    }
}

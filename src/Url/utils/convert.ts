import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull.js';
import { QueryStringItem } from '../_types.js';
import convertArray from './convertArray.js';
import convertObjectToQueryStringItem from './convertObjectToQueryStringItem.js';




export default function convert(name: string, value: any): QueryStringItem[]
{
    const result: QueryStringItem[] = [];

    if (!isUndefinedOrNull(value))
    {
        if (Array.isArray(value))
        {
            result.push(...convertArray(`${name}`, value));
        }
        else if (typeof value === 'object')
        {
            result.push(...convertObjectToQueryStringItem(value as Record<string, any>, `${name}.`));
        }
        else
        {
            result.push({
                name: name,
                value: value as string | number | boolean,
            });
        }
    }

    return result;
}

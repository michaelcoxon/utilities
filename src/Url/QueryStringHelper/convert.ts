import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull';
import { QueryStringItem } from './../Url.types';
import convertArray from './convertArray';
import convertObject from './convertObject';




export default function convert(name: string, value: unknown): QueryStringItem[]
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
            result.push(...convertObject(value as Record<string, unknown>, `${name}.`));
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

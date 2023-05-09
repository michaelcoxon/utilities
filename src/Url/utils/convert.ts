import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull';
import { QueryStringItem } from '../_types';

export default function convert(name?: string, value?: any): QueryStringItem[]
{
    const result: QueryStringItem[] = [];

    if (!isUndefinedOrNull(value))
    {
        if (Array.isArray(value))
        {
            for (let i = 0; i < value.length; i++)
            {
                const dkey = name && `${name}[${i}]` || i.toString();
                result.push(...convert(dkey,  value[i]));
            }
        }
        else if (typeof value === 'object')
        {
            for (const key in value)
            {
                if (!isUndefinedOrNull(value[key]))
                {
                    const dkey = name && `${name}.${key}` || key
                    result.push(...convert(dkey, value[key]));
                }
            }
        }
        else
        {
            result.push({
                name: name ?? 'name',
                value: value as string | number | boolean,
            });
        }
    }

    return result;
}
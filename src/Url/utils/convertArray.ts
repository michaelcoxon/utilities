import { QueryStringItem } from '../_types.js';
import  convert  from "./convert.js";

/**
 * Converts a `name=items[]` to a `name[index]=item` for a url query string.
 */
export default function convertArray(name: string, arr: any[]): QueryStringItem[]
{
    const result: QueryStringItem[] = [];

    for (let i = 0; i < arr.length; i++)
    {
        const item = arr[i];

        result.push(...convert(`${name}[${i}]`, item));
    }

    return result;
}

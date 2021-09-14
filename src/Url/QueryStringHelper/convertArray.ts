import { QueryStringItem } from './../Url.types';
import  convert  from "./convert";

export default function convertArray(name: string, arr: unknown[]): QueryStringItem[]
{
    const result: QueryStringItem[] = [];

    for (let i = 0; i < arr.length; i++)
    {
        const item = arr[i];

        result.push(...convert(`${name}[${i}]`, item));
    }

    return result;
}

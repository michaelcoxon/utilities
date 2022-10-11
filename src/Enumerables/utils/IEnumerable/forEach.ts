import { IEnumerable } from '../../_types';


export default function forEach<T>(iterable: Iterable<T>, callback: (value: T, index: number) => boolean | void): void
{
    let index = 0;
    for (const item of iterable)
    {
        const value = callback(item, index);
        if (value === false)
        {
            break;
        }
        index++;
    }
}
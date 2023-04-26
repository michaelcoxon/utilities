import { IEnumerable } from '../../_types';


export default function forEach<T>(source: IEnumerable<T>, callback: (value: T, index: number) => boolean | void): void
{
    const en = source.getEnumerator();
    let count = 0;
    while(en.moveNext())
    {
        const value = callback(en.current, count);
        if (value === false)
        {
            break;
        }
        count++;
    }
}
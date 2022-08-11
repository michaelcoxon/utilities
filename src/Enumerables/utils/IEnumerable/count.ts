import { IEnumerable } from '../../_types';



export default function count<T>(enumerable: IEnumerable<T>): number
{
    let itemCount = 0;
    const en = enumerable.getEnumerator();
    while (en.moveNext())
    {
        itemCount++;
    }

    return itemCount;
}
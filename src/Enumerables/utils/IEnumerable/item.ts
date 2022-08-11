import { Undefinable } from '../../../Types';
import { IEnumerable } from '../../_types';


export default function item<T>(enumerable: IEnumerable<T>, index: number): Undefinable<T>
{
    const en = enumerable.getEnumerator();
    let count = 0;
    while (count <= index && en.moveNext())
    {
        if (count === index)
        {
            return en.current;
        }
        count++;
    }

    return undefined;
}
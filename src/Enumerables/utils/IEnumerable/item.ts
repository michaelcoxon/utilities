import { Undefinable } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';


export default function item<T>(enumerable: IEnumerable<T>, index: number): Undefinable<T>
{
    let count = 0;
    for (const item of enumerable)
    {
        if (count <= index && count === index)
        {
            return item;
        }
        count++;
    }
}
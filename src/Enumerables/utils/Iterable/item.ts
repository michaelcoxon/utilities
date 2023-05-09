import { Undefinable } from '../../../Types';
import { IEnumerable } from '../../_types';


export default function item<T>(iterable: Iterable<T>, index: number): Undefinable<T>
{
    let count = 0;
    for (const item of iterable)
    {
        if (count <= index && count === index)
        {
            return item;
        }
        count++;
    }
}
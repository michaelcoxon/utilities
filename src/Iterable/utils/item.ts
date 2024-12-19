import { Undefinable } from '../../Types';

export default function item<T>(iterable: Iterable<T>, index: number): Undefinable<T>
{
    let count = 0;
    for (const item of iterable)
    {
        // TODO: why is this double guarded
        if (count <= index && count === index)
        {
            return item;
        }
        count++;
    }
}
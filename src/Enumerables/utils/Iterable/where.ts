import { Predicate } from '../../../Types.js';


export default function* where<T>(iterable: Iterable<T>, predicate: Predicate<T>): Iterable<T>
{
    for (const item of iterable)
    {
        if (predicate(item))
        {
            yield item;
        }
    }
}

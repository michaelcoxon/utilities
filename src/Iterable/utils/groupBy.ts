import { isUndefinedOrNull } from '../../TypeHelpers';
import { Selector } from '../../Types';


export default function groupBy<T, TKey>(iterable: Iterable<T>, keySelector: Selector<T, TKey>): Map<TKey, T[]>
{
    const result = new Map<TKey, T[]>();

    for (const item of iterable)
    {
        const key = keySelector(item);
        let items = result.get(key);

        if (isUndefinedOrNull(items))
        {
            items = [];
            result.set(key, items);
        }

        items.push(item);
    }

    return result;
}

// function* groupBy2<T, TKey>(iterable: Iterable<T>, keySelector: Selector<T, TKey>): Iterable<[TKey, T]>
// {
//     for (const item of iterable)
//     {
//         const key = keySelector(item);
//         yield [key, item];
//     }
// }
import { Selector } from '../../Types';

export default function groupBy<T, TKey>(array: T[], keySelector: Selector<T, TKey>): Map<TKey, T[]>
{
    const result = new Map<TKey, T[]>();

    for (const item of array)
    {
        const key = keySelector(item);
        const items = result.get(key) ?? [];

        items.push(item);

        result.set(key, items);
    }

    return result;
}
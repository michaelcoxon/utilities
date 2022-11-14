import { Predicate } from '../../../Types.js';
import { IEnumerable } from '../../_types.js';


export default function firstOrDefault<T>(enumerable: IEnumerable<T>, predicate?: Predicate<T>): T | null
{
    if (predicate !== undefined)
    {
        enumerable = enumerable.where(predicate);
    }

    const en = enumerable.getEnumerator();

    if (en.moveNext())
    {
        return en.current;
    }

    return null;
}
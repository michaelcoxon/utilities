import { IEnumerable } from '../../_types';

export default function contains<T>(enumerable: IEnumerable<T>, item: T): boolean
{
    let isContained = false;

    enumerable.forEach(v =>
    {
        if (v === item)
        {
            isContained = true;
            return false;
        }
    });

    return isContained;
}
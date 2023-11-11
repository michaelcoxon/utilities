import { IEnumerable } from '../../_types';



export default function toArray<T>(enumerable: IEnumerable<T>): T[]
{
    return [...enumerable];
}
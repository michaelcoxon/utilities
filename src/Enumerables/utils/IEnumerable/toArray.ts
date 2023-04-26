import { IEnumerable } from '../../_types';










export default function toArray<T>(source: IEnumerable<T>): T[]
{
    return [...source];
}
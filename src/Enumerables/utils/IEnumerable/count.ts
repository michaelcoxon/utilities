import { IEnumerable } from '../../_types.js';



export default function count<T>(iterable: Iterable<T>): number
{
    return [...iterable].length;
}
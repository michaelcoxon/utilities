import { IEnumerableOrArray } from '../../Types.js';

export default function asArray<T>(enumerableOrArray: IEnumerableOrArray<T>): T[]
{
    return [...enumerableOrArray];
}
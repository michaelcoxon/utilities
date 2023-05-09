import { IEnumerableOrArray } from '../_types';

export default function asArray<T>(enumerableOrArray: IEnumerableOrArray<T>): T[]
{
    return [...enumerableOrArray];
}
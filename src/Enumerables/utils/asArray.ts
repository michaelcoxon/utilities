import { IEnumerableOrArray } from '../../Types';

export default function asArray<T>(enumerableOrArray: IEnumerableOrArray<T>): T[]
{
    return [...enumerableOrArray];
}
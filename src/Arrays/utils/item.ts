import { Undefinable } from '../../Types';


export default function item<T>(array: T[], index: number): Undefinable<T>
{
    return array[index];
}
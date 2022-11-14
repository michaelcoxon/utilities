import { Undefinable } from '../../../Types.js';


export default function item<T>(array: T[], index: number): Undefinable<T>
{
    return array[index];
}
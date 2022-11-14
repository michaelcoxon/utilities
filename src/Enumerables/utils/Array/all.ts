import { Predicate } from '../../../Types.js';

export default function all<T>(array: T[], predicate: Predicate<T>): boolean
{
    return array.every(predicate);
}
import { Selector } from '../../../Types.js';
import count from './count.js';
import sum from './sum.js';


export default function average<T>(iterable: Iterable<T>, selector: Selector<T, number>): number
{
    return sum(iterable,selector) / count(iterable);
}
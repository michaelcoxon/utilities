import { Selector } from '../../../Types.js';
import count from './count.js';
import sum from './sum.js';


export default function average<T>(array: T[], selector: Selector<T, number>): number
{
    return sum(array, selector) / count(array);
}
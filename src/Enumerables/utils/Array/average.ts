import { Selector } from '../../../Types';
import count from './count';
import sum from './sum';


export default function average<T>(array: T[], selector: Selector<T, number>): number
{
    return sum(array, selector) / count(array);
}
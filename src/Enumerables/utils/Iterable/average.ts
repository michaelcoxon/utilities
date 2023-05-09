import { Selector } from '../../../Types';
import count from './count';
import sum from './sum';


export default function average<T>(iterable: Iterable<T>, selector: Selector<T, number>): number
{
    return sum(iterable,selector) / count(iterable);
}
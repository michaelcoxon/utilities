import { Selector } from '../../Types';
import sum from './sum';


export default function average<T>(iterable: Iterable<T>, selector: Selector<T, number>): number
{
    const array = [...iterable];
    return sum(array, selector) / array.length;
}
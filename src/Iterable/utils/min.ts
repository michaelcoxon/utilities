import { Selector } from '../../Types';
import select from './select';



export default function min<T>(interable: Iterable<T>, selector: Selector<T, number>): number
{
    const values = select(interable, selector);
    return Math.min(...values);
}
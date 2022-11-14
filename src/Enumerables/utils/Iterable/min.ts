import { Selector } from '../../../Types.js';
import select from './select.js';



export default function min<T>(interable: Iterable<T>, selector: Selector<T, number>): number
{
    const values = select(interable, selector);
    return Math.min(...values);
}
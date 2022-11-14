import { Selector } from '../../../Types.js';
import select from './select.js';



export default function max<T>(iterable: Iterable<T>, selector: Selector<T, number>): number
{
    const values = select(iterable, selector);
    return Math.max(...values);
}
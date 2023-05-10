import { Selector } from '../../Types';
import select from './select';



export default function max<T>(iterable: Iterable<T>, selector: Selector<T, number>): number
{
    const values = select(iterable, selector);
    return Math.max(...values);
}
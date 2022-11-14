import { Selector } from '../../../Types.js';
import select from './select.js';



export default function min<T>(array: T[], selector: Selector<T, number>): number
{
    const values = select(array, selector);
    return Math.min(...values);
}
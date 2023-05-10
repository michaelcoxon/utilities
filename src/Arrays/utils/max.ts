import { Selector } from '../../Types';
import select from './select';



export default function max<T>(array: T[], selector: Selector<T, number>): number
{
    const values = select(array, selector);
    return Math.max(...values);
}
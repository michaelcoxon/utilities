import { Selector } from '../../../Types.js';
import select from './select.js';



export default function sum<T>(iterable: Iterable<T>, selector: Selector<T, number>): number
{
    let result = 0;
    for (var item of select(iterable, selector))
    {
        result += item;
    }
    return result;
}
import { Selector } from '../../../Types';
import select from './select';



export default function sum<T>(array: T[], selector: Selector<T, number>): number
{
    let result = 0;
    for (var item of select(array, selector))
    {
        result += item;
    }
    return result;
}
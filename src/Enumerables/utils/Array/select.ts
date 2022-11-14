import { Selector } from '../../../Types.js';

export default function select<T, TOut>(array: T[], selector: Selector<T, TOut>): TOut[]
{
    return array.map(selector);
}

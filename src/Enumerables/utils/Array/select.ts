import { Selector } from '../../../Types';

export default function select<T, TOut>(array: T[], selector: Selector<T, TOut>): TOut[]
{
    return array.map(selector);
}

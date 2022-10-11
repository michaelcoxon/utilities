import { Predicate } from '../../../Types';
import { IEnumerable } from '../../_types';



export default function any<T>(iterable:Iterable<T>, predicate?: Predicate<T>): boolean
{
    for (const item of iterable)
    {
        if(!predicate || predicate(item))
        {
            return true;
        }
    }

    return false;
}
import { Predicate } from '../../../Types';

export default function all<T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean
{    
    for (const item of iterable)
    {
        if(!predicate(item))
        {
            return false;
        }
    }

    return true;
}
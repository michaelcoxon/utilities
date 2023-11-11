import type { Predicate } from '../../../Types';
import type { IEnumerable } from '../../_types';

import getHash from '../../../Utilities/getHash';


// USAGE: obj.Distinct(); or obj.Distinct(['key1'],['key2']);
export default function distinct<T, R>(enumerable: IEnumerable<T>, selector: (a: T) => R): IEnumerable<T>
{
    const temp: Record<string, boolean> = {};
    return enumerable.where(distinctPredicate<T, R>(selector, temp));
}

function distinctPredicate<T, R>(selector: (a: T) => R, temp: Record<string, boolean>): Predicate<T>
{
    return (item) =>
    {
        const value = selector(item);
        let s_value: string;

        if (value instanceof Object)
        {
            s_value = getHash(value);
        }
        else
        {
            s_value = "" + value;
        }

        // if we aint storing it then it is unique, so store it
        if (!temp[s_value])
        {
         // its unique
           temp[s_value] = true;
            return true;
        }

        // its a dupe
        return false;
    };
}

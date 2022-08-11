import { getHash } from '../../../Utilities';
import { IEnumerable } from '../../_types';


// USAGE: obj.Distinct(); or obj.Distinct(['key1'],['key2']);
export default function distinct<T, R>(enumerable: IEnumerable<T>, selector: (a: T) => R): IEnumerable<T>
{
    const temp: Record<string, boolean> = {};

    return enumerable.where((item) =>
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

        if (!temp[s_value])
        {
            temp[s_value] = true;
            return true;
        }

        return false;
    });
}
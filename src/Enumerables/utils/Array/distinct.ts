import getHash from '../../../Utilities/getHash.js';
import where from './where.js';


// USAGE: obj.Distinct(); or obj.Distinct(['key1'],['key2']);
export default function distinct<T, R>(array: T[], selector: (a: T) => R): T[]
{
    const temp: Record<string, boolean> = {};

    return where(array, (item) =>
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



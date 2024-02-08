import select from './select';


// USAGE: obj.Distinct(); or obj.Distinct(['key1'],['key2']);
export default function* distinct<T, R>(iterable: Iterable<T>, selector: (a: T) => R): Iterable<T>
{
    const temp = new Map<unknown,boolean>();

    for (const item of select(iterable, i => ({ value: selector(i), original: i })))
    {
        if (!temp.has(item.value))
        {
            temp.set(item.value, true);
            yield item.original;
        }
    }

    // return where(iterable, (item) =>
    // {
    //     const value = selector(item);
    //     let s_value: string;

    //     if (value instanceof Object)
    //     {
    //         s_value = getHash(value);
    //     }
    //     else
    //     {
    //         s_value = "" + value;
    //     }

    //     if (!temp[s_value])
    //     {
    //         temp[s_value] = true;
    //         return true;
    //     }

    //     return false;
    // });
}



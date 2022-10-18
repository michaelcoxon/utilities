import select from './select';


// USAGE: obj.Distinct(); or obj.Distinct(['key1'],['key2']);
export default function* distinct<T, R>(iterable: Iterable<T>, selector: (a: T) => R): Iterable<T>
{
    const temp = new WeakMap<any,boolean>();

    for (const item of select(iterable, i => ({ key: selector(i), value: i })))
    {
        if (!temp.has(item.key))
        {
            temp.set(item.key, true);
            yield item.value;
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



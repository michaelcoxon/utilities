import { ArgumentException } from './Exceptions';

export type ConstructorFor<T> =
    {
        new(value?: any): T;
    }

// returns true if the two objects are equal but not the same object. (compares public keys)
export function equals<T>(obj1: T, obj2: T, forceJSON?: boolean): boolean
{
    var state = false;

    forceJSON = forceJSON || false;

    if (!forceJSON)
    {
        for (let key in obj1)
        {
            if (obj1.hasOwnProperty(key))
            {
                state = obj1[key] == obj2[key];

                if (!state)
                {
                    break;
                }
            }
        }
    }
    else
    {
        state = equivilentToByJSON(obj1, obj2);
    }

    return state;
}

// returns true if the two objects are equal but not the same object. (compares the JSON equilient of each object) .. should be faster.. should..
export function equivilentToByJSON<T>(obj1: T, obj2: T): boolean
{
    return JSON.stringify(obj1) == JSON.stringify(obj2);
}

// returns a hash of the object
export function getHash(o: any): string
{
    let hash: string = "";

    if (!!JSON && !!JSON.stringify)
    {
        for (let key in o)
        {
            if (o.hasOwnProperty(key))
            {
                hash += key + ":" + o[key];
            }
        }
    }
    else
    {
        hash = JSON.stringify(o);
    }

    return hashString(hash).toString();
}

// Returns the type of the object as a string
export function getType(o: any)
{
    // null
    if (o === null)
    {
        return 'null';
    }

    // jquery
    if (o.fn !== undefined && o.fn.jquery !== undefined)
    {
        return 'jQuery';
    }

    // value types
    if (typeof (o) != 'object')
    {
        return typeof (o);
    }

    // MicrosoftAjax
    if (o.constructor.getName && o.constructor.getName() != null)
    {
        return o.constructor.getName();
    }

    // constructor method name
    if (o.constructor.name === undefined)
    {
        var name = o.constructor.toString().match(/^[\n\r\s]*function\s*([^\s(]+)/)[1]
        if (name != "")
        {
            return name;
        }
    }
    else
    {
        if (o.constructor.name != "") return o.constructor.name;
    }

    // fallback
    return typeof o;
}


function hashString(str: string): number
{
    if (str.length === 0)
    {
        return 0;
    }
    else if (Array.prototype.reduce === undefined)
    {
        var hash = 0, i, chr;
        for (i = 0; i < str.length; i++)
        {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    else
    {
        return str.split('')
            .map(chr => chr.charCodeAt(0))
            .reduce((hash, chr) => (((hash << 5) - hash) + chr) | 0);
    }
};
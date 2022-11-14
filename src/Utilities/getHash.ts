import { empty, KEY_VALUE_SEPARATOR } from '../Strings/_consts.js';
import hashString from "./hashString.js";

/**
 * returns a hash of the object
 * @param o
 */

export default function getHash(o: any): string
{
    let hash: string = empty;

    if (!!JSON && !!JSON.stringify)
    {
        for (const key in Object.getOwnPropertyNames(o))
        {
            hash += `${key}${KEY_VALUE_SEPARATOR}${o[key]}`;
        }
    }

    else
    {
        hash = JSON.stringify(o);
    }

    return hashString(hash).toString();
}

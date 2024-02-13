import { empty } from '../Strings/_consts';
import hashString from "./hashString";

/**
 * returns a hash of the object
 * @param o
 */

export default function getHash(o: unknown): string
{
    let hash: string = empty;
    hash = JSON.stringify(o);
    return hashString(hash).toString();
}

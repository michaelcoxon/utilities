import { empty } from './_consts';

/**
 * Returns all characters in the string as an array.
 * @param str
 */

export default function toCharArray(str: string): string[]
{
    return str.split(empty);
}

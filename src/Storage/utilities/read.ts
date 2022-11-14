import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull.js';
import { Undefinable } from '../../Types.js';
import convertToT from "./convertToT.js";


export default function read<T>(storage: Storage, key: string): Undefinable<T>
{
    const value = storage.getItem(key);
    return isUndefinedOrNull(value) ? undefined : convertToT<T>(value);
}

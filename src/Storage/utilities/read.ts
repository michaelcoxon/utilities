import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull';
import { Undefinable } from '../../Types';
import convertToT from "./convertToT";


export default function read<T>(storage: Storage, key: string): Undefinable<T>
{
    const value = storage.getItem(key);
    return isUndefinedOrNull(value) ? undefined : convertToT<T>(value);
}

import isUndefinedOrNull from '../../TypeHelpers/isUndefinedOrNull.js';
import convertToString from "./convertToString.js";


export default function write<T>(storage: Storage, key: string, entity: T): void
{
    const value = convertToString(entity);
    storage.setItem(key, value);
}

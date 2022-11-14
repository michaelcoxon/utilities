import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull.js';
import { Undefinable } from '../Types.js';
import empty from '../Utilities/empty.js';
import { IStorageRepository } from './Storage.types.js';
import createStorageKey from './utilities/createStorageKey.js';
import read from './utilities/read.js';
import write from './utilities/write.js';

export default class StorageRepository<T> implements IStorageRepository<string, T>
{
    readonly #name: string;
    readonly #storage: Storage;

    constructor(storage: Storage, name = empty)
    {
        this.#name = name;
        this.#storage = storage;
    }
    deleteAsync(key: string): Promise<void>
    {
        const _key = createStorageKey(this.#name, key);
        const value = read(this.#storage, _key);
        if (!isUndefinedOrNull(value))
        {
            write(this.#storage, _key, undefined);
        }
        return Promise.resolve();
    }

    getAsync(key: string): Promise<Undefinable<T>>
    {
        return Promise.resolve(read(this.#storage, createStorageKey(this.#name, key)));
    }

    setAsync(key: string, entity: T): Promise<void>
    {
        const _key = createStorageKey(this.#name, key);
        const value = read(this.#storage, _key);
        if (!isUndefinedOrNull(value))
        {
            write(this.#storage, _key, entity);
        }
        return Promise.resolve();
    }
}

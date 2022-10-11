import { empty } from '../Strings/_consts';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import { Undefinable } from '../Types';
import { IStorageRepository } from './Storage.types';
import createStorageKey from './utilities/createStorageKey';
import read from './utilities/read';
import write from './utilities/write';

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

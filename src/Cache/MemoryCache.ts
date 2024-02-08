import KeyNotFoundException from '../Exceptions/KeyNotFoundException';
import KeyAlreadyDefinedException from '../Exceptions/KeyAlreadyDefinedException';
import { IAsyncCacheItem, ICache, IExpiryPolicyDelegate } from './_types';
import AsyncCacheItem from './AsyncCacheItem';
import { Awaitable } from '../Types';
import { isUndefinedOrNull } from '../TypeHelpers';

/**
 * Creates an in-memory cache. This cache will be forgotten on disposal.
 */
export default class MemoryCache<TKey = string> implements ICache<TKey>
{
    readonly #internalCache: Map<TKey, IAsyncCacheItem<unknown>>;

    constructor()
    {
        this.#internalCache = new Map<TKey, IAsyncCacheItem<unknown>>();
    }

    add<T>(key: TKey, value: Awaitable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void
    {
        if (this.#internalCache.has(key))
        {
            throw new KeyAlreadyDefinedException(key);
        }

        this.#internalCache.set(key, new AsyncCacheItem(value, expiryPolicy));
    }

    async addOrGetAsync<T>(key: TKey, factory: (key: TKey) => Awaitable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): Promise<T>
    {
        const cacheItem = this.#internalCache.get(key) as IAsyncCacheItem<T> | undefined;
        const value = await cacheItem?.getValueAsync();

        if (!isUndefinedOrNull(value))
        {
            return value;
        }
        else
        {
            const value = factory(key);
            this.#internalCache.set(key, new AsyncCacheItem(value, expiryPolicy));
            return await value;
        }
    }

    addOrReplace<T>(key: TKey, value: Awaitable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void
    {
        this.#internalCache.set(key, new AsyncCacheItem(value, expiryPolicy));
    }

    async cleanAsync(): Promise<void>
    {
        for (const item of this.#internalCache)
        {
            const value = item[1];
            const key = item[0];

            if (!isUndefinedOrNull(await value.getValueAsync()))
            {
                this.#internalCache.delete(key);
            }
        }
    }

    async getAsync<T>(key: TKey): Promise<T>
    {
        const cacheItem = this.#internalCache.get(key);

        if (isUndefinedOrNull(cacheItem))
        {
            throw new KeyNotFoundException(key);
        }

        const value = await cacheItem.getValueAsync();
        if (isUndefinedOrNull(value))
        {
            this.#internalCache.delete(key);
            throw new KeyNotFoundException(key);
        }

        return value;
    }

    async tryGetAsync<T>(key: TKey): Promise<{ success: boolean; value?: T; }>
    {
        const cacheItem = this.#internalCache.get(key);

        if (cacheItem === undefined)
        {
            return { success: false };
        }

        const value = await cacheItem.getValueAsync();
        if (isUndefinedOrNull(value))
        {
            this.#internalCache.delete(key);
            return { success: false };
        }

        return { success: true, value };
    }

    replace<T>(key: TKey, value: Awaitable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void
    {
        if (!this.#internalCache.has(key))
        {
            throw new KeyNotFoundException(key);
        }

        this.#internalCache.set(key, new AsyncCacheItem(value, expiryPolicy));
    }
}

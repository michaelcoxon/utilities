import KeyNotFoundException from '../Exceptions/KeyNotFoundException';
import KeyAlreadyDefinedException from '../Exceptions/KeyAlreadyDefinedException';
import { IAsyncCacheItem, ICache, IExpiryPolicyDelegate } from './_types';
import AsyncCacheItem from './AsyncCacheItem';
import { Awaitable } from '../Types';


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
        const cacheItem = this.#internalCache.get(key);

        if (cacheItem !== undefined && !cacheItem.expiredAsync)
        {
            return (await cacheItem.valueAsync) as T;
        }

        const value = factory(key);

        this.#internalCache.set(key, new AsyncCacheItem(value, expiryPolicy));

        return await value;
    }

    addOrReplace<T>(key: TKey, value: Awaitable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void
    {
        this.#internalCache.set(key, new AsyncCacheItem(value, expiryPolicy));
    }

    async cleanAsync(): Promise<void>
    {
        for (var item of this.#internalCache)
        {
            const value = item[1];
            const key = item[0];

            if (await value.expiredAsync)
            {
                this.#internalCache.delete(key);
            }
        }
    }

    async getAsync<T>(key: TKey): Promise<T>
    {
        const cacheItem = this.#internalCache.get(key);

        if (cacheItem === undefined)
        {
            throw new KeyNotFoundException(key);
        }

        if (await cacheItem.expiredAsync)
        {
            this.#internalCache.delete(key);
            throw new KeyNotFoundException(key);
        }

        return (await cacheItem.valueAsync) as T;
    }

    async tryGetAsync<T>(key: TKey): Promise<{ success: boolean; value?: T; }>
    {
        const cacheItem = this.#internalCache.get(key);

        if (cacheItem === undefined)
        {
            return { success: false };
        }

        if (await cacheItem.expiredAsync)
        {
            this.#internalCache.delete(key);
            return { success: false };
        }

        return { success: true, value: await (cacheItem.valueAsync as Promise<T>) };
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

import KeyNotFoundException from '../Exceptions/KeyNotFoundException';
import KeyAlreadyDefinedException from '../Exceptions/KeyAlreadyDefinedException';
import { IAsyncCacheItem, ICache, IExpiryPolicyDelegate } from './_types';
import AsyncCacheItem from './AsyncCacheItem';
import { Promisable } from '../Types';


export default class MemoryCache<TKey = string> implements ICache<TKey>
{
    private readonly _internalCache: Map<TKey, IAsyncCacheItem<any>>;

    constructor()
    {
        this._internalCache = new Map<TKey, IAsyncCacheItem<any>>();
    }

    add<T>(key: TKey, value: Promisable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void
    {
        if (this._internalCache.has(key))
        {
            throw new KeyAlreadyDefinedException(key);
        }

        this._internalCache.set(key, new AsyncCacheItem(value, expiryPolicy));
    }

    async addOrGetAsync<T>(key: TKey, factory: (key: TKey) => Promisable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): Promise<T>
    {
        const cacheItem = this._internalCache.get(key);

        if (cacheItem !== undefined && !cacheItem.expiredAsync)
        {
            return cacheItem.valueAsync;
        }

        const value = factory(key);

        this._internalCache.set(key, new AsyncCacheItem(value, expiryPolicy));

        return await value;
    }

    addOrReplace<T>(key: TKey, value: Promisable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void
    {
        this._internalCache.set(key, new AsyncCacheItem(value, expiryPolicy));
    }

    clean(): void
    {
        this._internalCache.forEach((value, key, map) =>
        {
            if (value.expiredAsync)
            {
                map.delete(key);
            }
        });
    }

    getAsync<T>(key: TKey): Promise<T>
    {
        const cacheItem = this._internalCache.get(key);

        if (cacheItem === undefined)
        {
            throw new KeyNotFoundException(key);
        }

        if (cacheItem.expiredAsync)
        {
            this._internalCache.delete(key);
            throw new KeyNotFoundException(key);
        }

        return cacheItem.valueAsync;
    }

    tryGet<T>(key: TKey): { success: boolean; value?: Promise<T>; }
    {
        const cacheItem = this._internalCache.get(key);

        if (cacheItem === undefined)
        {
            return { success: false };
        }

        if (cacheItem.expiredAsync)
        {
            this._internalCache.delete(key);
            return { success: false };
        }

        return { success: true, value: cacheItem.valueAsync };
    }

    replace<T>(key: TKey, value: Promisable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void
    {
        if (!this._internalCache.has(key))
        {
            throw new KeyNotFoundException(key);
        }

        this._internalCache.set(key, new AsyncCacheItem(value, expiryPolicy));
    }
}

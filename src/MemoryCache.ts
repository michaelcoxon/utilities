import KeyNotFoundException from './Exceptions/KeyNotFoundException';
import KeyAlreadyDefinedException from './Exceptions/KeyAlreadyDefinedException';
import { ICache, ICacheItem, IExpiryPolicyDelegate } from './ICache';
import CacheItem from './CacheItem';


export default class MemoryCache<TKey = string> implements ICache<TKey>
{
    private readonly _internalCache: Map<TKey, ICacheItem<any>>;

    constructor()
    {
        this._internalCache = new Map<TKey, ICacheItem<any>>();
    }

    add<T>(key: TKey, value: T, expiryPolicy: IExpiryPolicyDelegate<T>): void
    {
        if (this._internalCache.has(key))
        {
            throw new KeyAlreadyDefinedException(key);
        }

        this._internalCache.set(key, new CacheItem(value, expiryPolicy));
    }

    addOrGet<T>(key: TKey, factory: (key: TKey) => T, expiryPolicy: IExpiryPolicyDelegate<T>): T
    {
        const cacheItem = this._internalCache.get(key);

        if (cacheItem !== undefined && !cacheItem.expired)
        {
            return cacheItem.value;
        }

        const value = factory(key);

        this._internalCache.set(key, new CacheItem(value, expiryPolicy));

        return value;
    }

    addOrUpdate<T>(key: TKey, value: T, expiryPolicy: IExpiryPolicyDelegate<T>): void
    {
        this._internalCache.set(key, new CacheItem(value, expiryPolicy));
    }

    clean(): void
    {
        this._internalCache.forEach((value, key, map) =>
        {
            if (value.expired)
            {
                map.delete(key);
            }
        });
    }

    get<T>(key: TKey): T
    {
        const cacheItem = this._internalCache.get(key);

        if (cacheItem === undefined)
        {
            throw new KeyNotFoundException(key);
        }

        if (cacheItem.expired)
        {
            this._internalCache.delete(key);
            throw new KeyNotFoundException(key);
        }

        return cacheItem.value;
    }

    tryGet<T>(key: TKey): { success: boolean; value?: T; }
    {
        const cacheItem = this._internalCache.get(key);

        if (cacheItem === undefined)
        {
            return { success: false };
        }

        if (cacheItem.expired)
        {
            this._internalCache.delete(key);
            return { success: false };
        }

        return { success: true, value: cacheItem.value };
    }

    update<T>(key: TKey, value: T, expiryPolicy: IExpiryPolicyDelegate<T>): void
    {
        if (!this._internalCache.has(key))
        {
            throw new KeyNotFoundException(key);
        }

        this._internalCache.set(key, new CacheItem(value, expiryPolicy));
    }
}

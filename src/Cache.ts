import 'tslib';

import { Exception, KeyAlreadyDefinedException, KeyNotFoundException } from './Exceptions';
import { Promisable } from './Types';


export type IExpiryPolicyDelegate<T> = (value: T) => boolean;

export class CacheExpiredException extends Exception
{
    constructor()
    {
        super("The cache has expired");
        this.name = "CacheExpiredException";
    }
}

export interface ICacheItem<T>
{
    readonly expired: boolean;
    readonly value: T;
}

export interface IAsyncCacheItem<T>
{
    readonly expiredAsync: Promise<boolean>;
    readonly valueAsync: Promise<T>;
}

export interface ICache<TKey>
{
    add<T>(key: TKey, value: T, expiryPolicy: IExpiryPolicyDelegate<T>): void;
    addOrGet<T>(key: TKey, factory: (key: TKey) => T, expiryPolicy: IExpiryPolicyDelegate<T>): T;
    addOrUpdate<T>(key: TKey, value: T, expiryPolicy: IExpiryPolicyDelegate<T>): void;
    clean(): void;
    get<T>(key: TKey): T;
    tryGet<T>(key: TKey): { success: boolean, value?: T }
    update<T>(key: TKey, value: T, expiryPolicy: IExpiryPolicyDelegate<T>): void;
}

export class CacheItem<T> implements ICacheItem<T>, IAsyncCacheItem<T>
{
    private readonly _value: T;
    private readonly _expiryPolicy: IExpiryPolicyDelegate<T>;

    constructor(value: T, expiryPolicy: IExpiryPolicyDelegate<T>)
    {
        this._value = value;
        this._expiryPolicy = expiryPolicy;
    }

    public get value(): T
    {
        if (this.expired)
        {
            throw new CacheExpiredException();
        }

        return this._value;
    }

    public get expired(): boolean
    {
        return this._expiryPolicy(this._value);
    }

    public get valueAsync(): Promise<T>
    {
        return new Promise<T>(async (resolve, reject) =>
        {
            try
            {
                if (await this.expiredAsync)
                {
                    throw new CacheExpiredException();
                }

                resolve(this._value);
            }
            catch (ex)
            {
                reject(ex);
            }
        });
    }

    public get expiredAsync(): Promise<boolean>
    {
        return new Promise<boolean>(async (resolve, reject) =>
        {
            try
            {
                resolve(this._expiryPolicy(this._value));
            }
            catch (ex)
            {
                reject(ex);
            }
        });

    }
}

export class AsyncCacheItem<T> implements IAsyncCacheItem<T>
{
    private readonly _promiseOrValue: Promisable<T>;
    private readonly _expiryPolicy: IExpiryPolicyDelegate<T>;

    constructor(promiseOrValue: Promisable<T>, expiryPolicy: IExpiryPolicyDelegate<T>)
    {
        this._promiseOrValue = promiseOrValue;
        this._expiryPolicy = expiryPolicy;
    }

    public get valueAsync(): Promise<T>
    {
        return new Promise<T>(async (resolve, reject) =>
        {
            try
            {
                if (await this.expiredAsync)
                {
                    throw new CacheExpiredException();
                }

                resolve(await this._promiseOrValue);
            }
            catch (ex)
            {
                reject(ex);
            }
        });
    }

    public get expiredAsync(): Promise<boolean>
    {
        return new Promise<boolean>(async (resolve, reject) =>
        {
            try
            {
                resolve(this._expiryPolicy(await this._promiseOrValue));
            }
            catch (ex)
            {
                reject(ex);
            }
        });

    }
}

export class MemoryCache<TKey = string> implements ICache<TKey>
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
            return { success: false }
        }

        if (cacheItem.expired)
        {
            this._internalCache.delete(key);
            return { success: false }
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
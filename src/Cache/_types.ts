import { Awaitable } from '../Types';

/**
 * A function that returns true if the value is expired.
 * @argument value the value to evaluate.
 */
export type IExpiryPolicyDelegate<T, TAsyncCacheItem = IAsyncCacheItem<T>> = (value: TAsyncCacheItem) => boolean;


export interface IAsyncCacheItem<T>
{
    readonly expiredAsync: Promise<boolean>;
    readonly valueAsync: Promise<T>;
}

export interface ICache<TKey>
{
    add<T>(key: TKey, value: Awaitable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void;
    addOrGetAsync<T>(key: TKey, factory: (key: TKey) => Awaitable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): Promise<T>;
    addOrReplace<T>(key: TKey, value: Awaitable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void;
    cleanAsync(): Promise<void>;
    getAsync<T>(key: TKey): Promise<T>;
    tryGetAsync<T>(key: TKey): Promise<{ success: boolean, value?: Promise<T>; }>;
    replace<T>(key: TKey, value: Awaitable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void;
}


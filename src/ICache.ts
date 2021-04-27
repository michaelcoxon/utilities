export type IExpiryPolicyDelegate<T> = (value: T) => boolean;

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
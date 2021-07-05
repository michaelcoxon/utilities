import { Promisable } from '../Types';

/**
 * A function that returns true if the value is expired.
 * @argument value the value to evaluate.
 */
 export type IExpiryPolicyDelegate<T> = (value: IAsyncCacheItem<T>) => boolean;


export interface IAsyncCacheItem<T>
{
    readonly expiredAsync: Promise<boolean>;
    readonly valueAsync: Promise<T>;
}

export interface ICache<TKey>
{
    add<T>(key: TKey, value: Promisable<T> , expiryPolicy: IExpiryPolicyDelegate<T>): void;
    addOrGetAsync<T>(key: TKey, factory: (key: TKey) => Promisable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): Promise<T> ;
    addOrReplace<T>(key: TKey, value: Promisable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void;
    clean(): void;
    getAsync<T>(key: TKey): Promise<T> ;
    tryGet<T>(key: TKey): { success: boolean, value?: Promise<T> }
    replace<T>(key: TKey, value: Promisable<T>, expiryPolicy: IExpiryPolicyDelegate<T>): void;
}
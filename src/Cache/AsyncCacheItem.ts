import { Awaitable } from '../Types';
import { IAsyncCacheItem, IExpiryPolicyDelegate } from './_types';
import CacheExpiredException from './CacheExpiredException';
import { isFunction } from '..';


export default class AsyncCacheItem<T> implements IAsyncCacheItem<T>
{
    readonly #promiseOrValue: Awaitable<T>;
    readonly #expiryPolicy: IExpiryPolicyDelegate<T, AsyncCacheItem<T>>;

    constructor(promiseOrValueOrFactory: Awaitable<T> | (() => Awaitable<T>), expiryPolicy: IExpiryPolicyDelegate<T, AsyncCacheItem<T>>)
    {
        if (isFunction(promiseOrValueOrFactory))
        {
            this.#promiseOrValue = promiseOrValueOrFactory();
        }
        else
        {
            this.#promiseOrValue = promiseOrValueOrFactory;
        }
        this.#expiryPolicy = expiryPolicy;
    }

    public get valueAsync(): Promise<T>
    {
        return new Promise<T>((resolve, reject) =>
        {
            (async () =>
            {
                try
                {
                    if (await this.expiredAsync)
                    {
                        throw new CacheExpiredException();
                    }

                    resolve(await this.#promiseOrValue);
                }
                catch (ex)
                {
                    reject(ex);
                }
            })();
        });
    }

    public get expiredAsync(): Promise<boolean>
    {
        return new Promise<boolean>((resolve, reject) =>
        {
            try
            {
                resolve(this.#expiryPolicy(this));
            }
            catch (ex)
            {
                reject(ex);
            }
        });
    }
}

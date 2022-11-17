import { Awaitable } from '../Types.js';
import { IAsyncCacheItem, IExpiryPolicyDelegate } from './_types.js';
import CacheExpiredException from './CacheExpiredException.js';
import isFunction from '../TypeHelpers/isFunction.js';
import isAwaitable from '../TypeHelpers/isAwaitable.js';
import Exception from '../Exceptions/Exception.js';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull.js';


export default class AsyncCacheItem<T> implements IAsyncCacheItem<T>
{
    readonly #promiseOrValue: Awaitable<T>;
    readonly #checkIfExpired: IExpiryPolicyDelegate<T, AsyncCacheItem<T>>;

    #complete = false;
    #expired = false;
    #failed = false;
    #result?: T;
    #error?: unknown[];

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
        this.#checkIfExpired = expiryPolicy;
        this.#subscribe(this.#promiseOrValue);
    }

    public get valueAsync(): Promise<T>
    {
        if (this.#expired)
        {
            throw new CacheExpiredException();
        }

        if (this.#complete)
        {
            if (this.#failed || isUndefinedOrNull(this.#result))
            {
                throw this.#error ?? new Exception("unknown error");
            }

            return Promise.resolve(this.#result);
        }

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
        if (this.#expired)
        {
            return Promise.resolve(this.#expired);
        }

        return new Promise<boolean>((resolve, reject) =>
        {
            try
            {
                resolve(this.#expired = this.#checkIfExpired(this));
            }
            catch (ex)
            {
                reject(ex);
            }
        });
    }

    #subscribe(promiseOrValue: Awaitable<T>): void
    {
        if (isAwaitable(promiseOrValue))
        {
            promiseOrValue.then(
                v =>
                {
                    this.#complete = true;
                    this.#failed = false;
                    this.#result = v;
                    this.#error = undefined;
                },
                (...args: unknown[]) =>
                {
                    this.#complete = true;
                    this.#failed = true;
                    this.#result = undefined;
                    this.#error = args;
                });
        }
        else
        {
            this.#complete = true;
            this.#failed = false;
            this.#result = promiseOrValue;
            this.#error = undefined;
        }
    }
}

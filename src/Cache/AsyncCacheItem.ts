import { Awaitable } from '../Types';
import { IAsyncCacheItem, IExpiryPolicyDelegate } from './_types';
import CacheExpiredException from './CacheExpiredException';
import isFunction from '../TypeHelpers/isFunction';
import { cat } from 'shelljs';
import { Promises } from '..';
import { error } from 'console';


export default class AsyncCacheItem<T> implements IAsyncCacheItem<T>
{
    readonly #promiseOrValue: Awaitable<T>;
    readonly #expiryPolicy: IExpiryPolicyDelegate<T>;

    constructor(promiseOrValueOrFactory: Awaitable<T> | (() => Awaitable<T>), expiryPolicy: IExpiryPolicyDelegate<T>)
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

    public getValueAsync(): Promise<T>
    {
        return new Promise<T>(async (resolve, reject) =>
        {
            try
            {
                const value = await Promises.ensurePromise(this.#promiseOrValue);
                if (this.#expiryPolicy(value))
                {
                    reject();
                }
                else
                {
                    resolve(value);
                }
            } 
            catch (error)
            {
                reject(error);
            }
        });
    }
}

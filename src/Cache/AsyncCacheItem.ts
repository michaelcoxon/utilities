import { Awaitable } from '../Types';
import { IAsyncCacheItem, IExpiryPolicyDelegate } from './_types';
import isFunction from '../TypeHelpers/isFunction';
import { Promises } from '..';


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
        return new Promise<T>((resolve, reject) =>
        {
            (async () =>
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
            })();
        });
    }
}

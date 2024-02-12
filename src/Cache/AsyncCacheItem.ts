import { Awaitable } from '../Types';
import { IAsyncCacheItem, IExpiryPolicyDelegate } from './_types';
import isFunction from '../TypeHelpers/isFunction';
import { Promises } from '..';


export default class AsyncCacheItem<T> implements IAsyncCacheItem
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

    public getValueAsync<T1 = T>(): Promise<T1>
    {        
        return new Promise<T1>((resolve, reject) =>
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
                        resolve(value as T1);
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

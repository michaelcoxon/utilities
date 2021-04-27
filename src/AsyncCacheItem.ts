import { Promisable } from './Types';
import { IAsyncCacheItem, IExpiryPolicyDelegate } from './ICache';
import CacheExpiredException from './CacheExpiredException';


export default class AsyncCacheItem<T> implements IAsyncCacheItem<T>
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

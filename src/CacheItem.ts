import CacheExpiredException from './CacheExpiredException';
import { ICacheItem, IAsyncCacheItem, IExpiryPolicyDelegate } from './ICache';


export default class CacheItem<T> implements ICacheItem<T>, IAsyncCacheItem<T>
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

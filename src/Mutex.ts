import MutexAlreadyAquiredException from './Exceptions/MutexAlreadyAquiredException';
import SingleInvokeEvent from './SingleInvokeEvent';
import { isUndefined } from './TypeHelpers';

/** Interface for a lock */
export interface ILock
{
    /** Releases the lock */
    releaseAsync(): Promise<void>;
}

class Lock implements ILock
{
    private readonly _releaseAsync: () => Promise<void>;

    constructor(releaseAsync: () => Promise<void>)
    {
        this._releaseAsync = releaseAsync;
    }

    public releaseAsync(): Promise<void>
    {
        return this._releaseAsync();
    }
}

/**
 * Creates a mutex that when acquired will return a lock that needs to be released
 * before any waiting code can be run.
 */
export default class Mutex 
{
    private _onRelease?: SingleInvokeEvent<{}>;

    /** Acquires a lock on this mutex. Only one lock can be kept at a time; calling multiple times will fail */
    public acquire(): ILock
    {
        if (!isUndefined(this._onRelease))
        {
            throw new MutexAlreadyAquiredException();
        }

        this._onRelease = new SingleInvokeEvent();

        return new Lock(() =>
        {
            return new Promise<void>((resolve, reject) =>
            {
                try
                {
                    this._onRelease && this._onRelease.invoke(this, {});
                    this._onRelease = undefined;
                    resolve();
                }
                catch (e)
                {
                    reject(e);
                }
            });
        });
    }

    /** 
     * Returns a promise that can be awaited until the lock is released. 
     * If there is no lock the promise is resolved immediately.
     */
    public waitAsync(): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            try
            {
                if (isUndefined(this._onRelease))
                {
                    // not acquired
                    return resolve();
                }
                else
                {
                    // resolve promise when lock is released
                    this._onRelease.addHandler(() => resolve());
                }
            }
            catch (e)
            {
                reject(e);
            }
        });
    }
}

/**
 * Locks on the provided mutex until the provided func is complete, then returning a value if any.
 * @param mutex
 * @param func
 */
export async function lockAsync<T>(mutex: Mutex, func: () => T): Promise<T>;
export async function lockAsync<T>(mutex: Mutex, func: () => Promise<T>): Promise<T>;
export async function lockAsync<T>(mutex: Mutex, func: () => any): Promise<T>
{
    const lock = mutex.acquire();
    const result = await func();
    await lock.releaseAsync();
    return result;
}
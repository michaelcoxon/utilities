import MutexAlreadyAquiredException from './Exceptions/MutexAlreadyAquiredException';
import SingleInvokeEvent from './SingleInvokeEvent';
import isUndefined from './TypeHelpers/isUndefined';
import { Awaitable } from './Types';

/** Interface for a lock */
export interface ILock
{
    /** Releases the lock */
    releaseAsync(): Promise<void>;
}

class Lock implements ILock
{
    readonly #releaseAsync: () => Promise<void>;

    constructor(releaseAsync: () => Promise<void>)
    {
        this.#releaseAsync = releaseAsync;
    }

    public releaseAsync(): Promise<void>
    {
        return this.#releaseAsync();
    }
}

/**
 * Creates a mutex that when acquired will return a lock that needs to be released
 * before any waiting code can be run.
 */
export default class Mutex 
{
    #onRelease?: SingleInvokeEvent<any>;

    /** Acquires a lock on this mutex. Only one lock can be kept at a time; calling multiple times will fail */
    public async acquireAsync()
    {
        if (!isUndefined(this.#onRelease))
        {
            await this.waitAsync();
        }

        this.#onRelease = new SingleInvokeEvent();

        return new Lock(() =>
        {
            return new Promise<void>((resolve, reject) =>
            {
                try
                {
                    this.#onRelease && this.#onRelease.invoke(this, {});
                    this.#onRelease = undefined;
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
                if (isUndefined(this.#onRelease))
                {
                    // not acquired
                    return resolve();
                }
                else
                {
                    // resolve promise when lock is released
                    this.#onRelease.addHandler(() => resolve());
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
export async function lockAsync<T>(mutex: Mutex, func: () => Awaitable<T>): Promise<T>
{
    const lock = await mutex.acquireAsync();
    const result = await func();
    await lock.releaseAsync();
    return result;
}
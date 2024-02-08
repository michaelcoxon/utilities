import SingleInvokeEvent from './Events/SingleInvokeEvent';
import isUndefined from './TypeHelpers/isUndefined';
import { Awaitable } from './Types';
import CancellationToken from './Promises/CancellationToken';

/** Interface for a lock */
export interface ILock
{
    /** Releases the lock */
    releaseAsync(): Promise<void>;
}

class Lock implements ILock
{
    readonly #releaseAsync: (cancellationToken: CancellationToken) => Promise<void>;

    constructor(releaseAsync: (cancellationToken: CancellationToken) => Promise<void>)
    {
        this.#releaseAsync = releaseAsync;
    }

    public releaseAsync(cancellationToken: CancellationToken = CancellationToken.default): Promise<void>
    {
        return this.#releaseAsync(cancellationToken);
    }
}

/**
 * Creates a mutex that when acquired will return a lock that needs to be released
 * before any waiting code can be run.
 */
export default class Mutex
{
    #onRelease?: SingleInvokeEvent<unknown>;

    /** Acquires a lock on this mutex. Only one lock can be kept at a time; calling multiple times will create dependent locks */
    public async acquireAsync(cancellationToken: CancellationToken = CancellationToken.default)
    {
        if (!isUndefined(this.#onRelease))
        {
            await this.waitAsync(cancellationToken);
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
    public waitAsync(cancellationToken: CancellationToken = CancellationToken.default): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            cancellationToken.onCancelled.addHandler(() => reject());

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
export async function lockAsync<T>(mutex: Mutex, func: () => T, cancellationToken?: CancellationToken): Promise<T>;
export async function lockAsync<T>(mutex: Mutex, func: () => Promise<T>, cancellationToken?: CancellationToken): Promise<T>;
export async function lockAsync<T>(mutex: Mutex, func: () => Awaitable<T>, cancellationToken: CancellationToken = CancellationToken.default): Promise<T>
{
    const lock = await mutex.acquireAsync(cancellationToken);
    const result = await func();
    await lock.releaseAsync(cancellationToken);
    return result;
}
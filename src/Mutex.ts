import { MutexAlreadyAquiredException, AlreadyDisposedException } from './Exceptions';
import { IDisposable, using, usingAsync } from './IDisposable';
import { SingleInvokeEvent } from './SingleInvokeEvent';
import { isUndefined } from './TypeHelpers';

/** Interface for a lock */
export interface ILock extends IDisposable
{
    /** Releases the lock */
    release(): void;
}

class Lock implements ILock
{
    private readonly _release: () => void;
    private _isDisposed: boolean = false;

    constructor(release: () => void)
    {
        this._release = release;
    }

    public release(): void
    {
        this.dispose();
    }

    public dispose(): void
    {
        if (this._isDisposed)
        {
            throw new AlreadyDisposedException();
        }
        this._release();
    }
}

/**
 * Creates a mutex that when acquired will return a lock that needs to be released
 * before any waiting code can be run.
 */
export class Mutex 
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
            this._onRelease && this._onRelease.invoke(this, {});
            this._onRelease = undefined;
        });
    }

    /** 
     * Returns a promise that can be awaited until the lock is released. 
     * If there is no lock the promise is resolved immediately.
     */
    public wait(): Promise<void>
    {
        return new Promise((resolve) =>
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
        });
    }
}

/**
 * Locks on the provided mutex until the provided func is complete, then returning a value if any.
 * @param mutex
 * @param func
 */
export function lock<T>(mutex: Mutex, func: () => T): T
{
    return using(() => mutex.acquire(), () => func());
}

/**
 * Locks on the provided mutex until the provided func is complete, then returning a value if any.
 * @param mutex
 * @param func
 */
export function lockAsync<T>(mutex: Mutex, func: () => Promise<T>): Promise<T>
{
    return usingAsync(() => mutex.acquire(), () => func());
}
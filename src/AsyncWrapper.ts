import 'tslib';

import { SingleInvokeEvent } from "./SingleInvokeEvent";
import { Undefinable, Promisable } from "./Types";
import { isFunction } from './TypeHelpers';

/**
 * The AsyncWrapper is provided to monitor the state of a promise.
 * You can use this to provide state feedback to the user of an awaitable
 * method.
 */
export class AsyncWrapper<T>
{
    private readonly _callback: ((asyncWrapper: AsyncWrapper<T>) => void) | undefined;
    private readonly _completeEvent: SingleInvokeEvent<Undefinable<T>>;

    private _promise?: Promise<T>;
    private _complete: boolean;
    private _success: boolean;
    private _error: any;
    private _value: Undefinable<T>;

    /**
    * Creates a new unresolved AsyncWrapper
    */
    constructor();
    /**
    * Creates a new AsyncWrapper
    * @param promiseOrValue can be a promise or a value
    */
    constructor(promiseOrValue: Promisable<T>);
    /**
      * Creates a new AsyncWrapper
      * @param promiseOrValue can be a promise or a value
      * @param callback the callback that should be applied after the promise is resolved
      */
    constructor(promiseOrValue: Promisable<T>, callback: (asyncWrapper: AsyncWrapper<T>) => void);
    /**
    * Creates a new AsyncWrapper
    * @param promiseFactory can be a promise or a value factory that will be invoked immediately
    */
    constructor(promiseFactory: () => Promisable<T>);
    /**
      * Creates a new AsyncWrapper
      * @param promiseFactory can be a promise or a value factory that will be invoked immediately
      * @param callback the callback that should be applied after the promise is resolved
      */
    constructor(promiseFactory: () => Promisable<T>, callback: (asyncWrapper: AsyncWrapper<T>) => void);
    /**
    * Creates a new AsyncWrapper
    * @param promiseOrValueOrFactory can be a promise or a value factory, a value or a promise that will be invoked immediately
    * @param callback the callback that should be applied after the promise is resolved
    */
    constructor(promiseOrValueOrFactory?: Promisable<T> | (() => Promisable<T>), callback?: (asyncWrapper: AsyncWrapper<T>) => void);
    constructor(promiseOrValueOrFactory?: Promisable<T> | (() => Promisable<T>), callback?: (asyncWrapper: AsyncWrapper<T>) => void)
    {
        this._complete = false;
        this._success = false;
        this._completeEvent = new SingleInvokeEvent();
        this._callback = callback;

        this.update(promiseOrValueOrFactory);
    }

    public update(promiseOrValueOrFactory?: Promisable<T> | (() => Promisable<T>)): void
    {
        if (promiseOrValueOrFactory !== undefined)
        {
            this._success = false;
            this._complete = false;

            if (isFunction(promiseOrValueOrFactory))
            {
                this._promise = Promise.resolve(promiseOrValueOrFactory());
            }
            else
            {
                this._promise = Promise.resolve(promiseOrValueOrFactory);
            }

            new Promise<T>(async (resolve, reject) =>
            {
                let cancelled = false;
                const promise = this._promise;

                try
                {
                    const value = await promise;
                    if (this._promise !== promise)
                    {
                        cancelled = true;
                        return;
                    }
                    this._value = value;
                    resolve(this.value);
                    this._success = true;
                }
                catch (error)
                {
                    if (this._promise !== promise)
                    {
                        cancelled = true;
                        return;
                    }
                    this._error = error;
                    reject(error);
                    this._success = false;
                }
                finally
                {
                    if (!cancelled)
                    {
                        this._complete = true;
                        this._completeEvent.invoke(this, this._value);

                        if (this._callback !== undefined)
                        {
                            this._callback(this);
                        }
                    }
                }
            });
        }
    }

    /** Event to be fired when the internal promise has completed */
    public get completeEvent(): SingleInvokeEvent<Undefinable<T>>
    {
        return this._completeEvent;
    }

    /** Return the internal promise that is waiting for the orginal one to complete */
    public get promise(): Undefinable<Promise<T>>
    {
        return this._promise;
    }

    /** returns true when the promise is complete, even if it errored */
    public get complete(): boolean
    {
        return this._complete;
    }

    /** returns true if the promise completed successfully */
    public get success(): boolean
    {
        return this._success;
    }

    /** returns the value of the promise */
    public get value(): T
    {
        return this._value!;
    }

    /** returns the error if the promise failed */
    public get error(): any
    {
        return this._error;
    }
}
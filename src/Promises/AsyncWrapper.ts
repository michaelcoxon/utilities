import SingleInvokeEvent from "../Events/SingleInvokeEvent";
import isFunction from '../TypeHelpers/isFunction';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import { Undefinable, Awaitable } from "../Types";

/**
 * The AsyncWrapper is provided to monitor the state of a promise.
 * You can use this to provide state feedback to the user of an awaitable
 * method.
 */
export default class AsyncWrapper<T>
{
    readonly #callback: ((asyncWrapper: AsyncWrapper<T>) => void) | undefined;
    readonly #completeEvent: SingleInvokeEvent<Undefinable<T>>;

    #promise?: Promise<T>;
    #complete: boolean;
    #success: boolean;
    #error: any;
    #value: Undefinable<T>;
    #promiseOrValueOrFactory: Awaitable<T> | (() => Awaitable<T>) | undefined;
    #awaitable: Promise<any>;

    /**
    * Creates a new unresolved AsyncWrapper
    */
    constructor();
    /**
    * Creates a new AsyncWrapper
    * @param promiseOrValue can be a promise or a value
    */
    constructor(promiseOrValue: Awaitable<T>);
    /**
      * Creates a new AsyncWrapper
      * @param promiseOrValue can be a promise or a value
      * @param callback the callback that should be applied after the promise is resolved
      */
    constructor(promiseOrValue: Awaitable<T>, callback: (asyncWrapper: AsyncWrapper<T>) => void);
    /**
    * Creates a new AsyncWrapper
    * @param promiseFactory can be a promise or a value factory that will be invoked immediately
    */
    constructor(promiseFactory: () => Awaitable<T>);
    /**
      * Creates a new AsyncWrapper
      * @param promiseFactory can be a promise or a value factory that will be invoked immediately
      * @param callback the callback that should be applied after the promise is resolved
      */
    constructor(promiseFactory: () => Awaitable<T>, callback: (asyncWrapper: AsyncWrapper<T>) => void);
    /**
    * Creates a new AsyncWrapper
    * @param promiseOrValueOrFactory can be a promise or a value factory, a value or a promise that will be invoked immediately
    * @param callback the callback that should be applied after the promise is resolved
    */
    constructor(promiseOrValueOrFactory?: Awaitable<T> | (() => Awaitable<T>), callback?: (asyncWrapper: AsyncWrapper<T>) => void);
    constructor(promiseOrValueOrFactory?: Awaitable<T> | (() => Awaitable<T>), callback?: (asyncWrapper: AsyncWrapper<T>) => void)
    {
        this.#awaitable = (async () => undefined)();
        this.#complete = false;
        this.#success = false;
        this.#completeEvent = new SingleInvokeEvent();
        this.#callback = callback;
        this.#promiseOrValueOrFactory = promiseOrValueOrFactory;
        this.update(this.#promiseOrValueOrFactory);
    }

    public update(promiseOrValueOrFactory: (Awaitable<T> | (() => Awaitable<T>) | undefined) = this.#promiseOrValueOrFactory): void
    {
        if (promiseOrValueOrFactory !== undefined)
        {
            this.#promiseOrValueOrFactory = promiseOrValueOrFactory;
            this.#success = false;
            this.#complete = false;

            if (isFunction(this.#promiseOrValueOrFactory))
            {
                this.#promise = Promise.resolve(this.#promiseOrValueOrFactory());
            }
            else
            {
                this.#promise = Promise.resolve(this.#promiseOrValueOrFactory);
            }

            this.#awaitable = new Promise<T>((resolve, reject) =>
            {
                (async () =>
                {
                    let cancelled = false;
                    const promise = this.#promise;
                    try
                    {
                        const value = await promise;
                        if (this.#promise !== promise)
                        {
                            cancelled = true;
                            return;
                        }
                        this.#value = value;
                        resolve(value as Awaitable<T>);
                        this.#success = true;
                    }
                    catch (error)
                    {
                        if (this.#promise !== promise)
                        {
                            cancelled = true;
                            return;
                        }
                        this.#error = error;
                        reject(error);
                        this.#success = false;
                    }
                    finally
                    {
                        if (!cancelled)
                        {
                            this.#complete = true;
                            this.#completeEvent.invoke(this, this.#value);

                            if (!isUndefinedOrNull(this.#callback))
                            {
                                this.#callback(this);
                            }
                        }
                    }
                })();
            });
        }
    }

    /** Event to be fired when the internal promise has completed */
    public get completeEvent(): SingleInvokeEvent<Undefinable<T>>
    {
        return this.#completeEvent;
    }

    /** Return the internal promise that is waiting for the orginal one to complete */
    public get promise(): Promise<T>
    {
        return this.#awaitable as Promise<T>;
    }

    /** returns true when the promise is complete, even if it errored */
    public get complete(): boolean
    {
        return this.#complete;
    }

    /** returns true if the promise completed successfully */
    public get success(): boolean
    {
        return this.#success;
    }

    /** returns the value of the promise */
    public get value(): Undefinable<T>
    {
        return this.#value;
    }

    /** returns the error if the promise failed */
    public get error(): any
    {
        return this.#error;
    }

    public cancel(): void
    {
        this.#promise = undefined;
    }
}
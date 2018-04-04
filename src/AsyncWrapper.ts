import { SingleInvokeEvent } from "./SingleInvokeEvent";
import { Undefinable, Promisable } from "./Types";

/**
 * The AsyncWrapper is provided to monitor the state of a promise.
 * You can use this to provide state feedback to the user of an awaitable
 * method.
 */
export class AsyncWrapper<T>
{
    private readonly _completeEvent: SingleInvokeEvent<Undefinable<T>>;

    private _promise: Promise<this>;
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
    constructor(promiseOrValue?: Promisable<T>, callback?: (asyncWrapper: AsyncWrapper<T>) => void)
    {
        this._complete = false;
        this._success = false;
        this._completeEvent = new SingleInvokeEvent();

        this._promise = new Promise<this>(async (resolve, reject) =>
        {
            if (promiseOrValue !== undefined)
            {
                await this.doWork(resolve, reject, promiseOrValue, callback);
            }
        });
    }

    public get completeEvent(): SingleInvokeEvent<Undefinable<T>>
    {
        return this._completeEvent;
    }

    /** Return the internal promise that is waiting for the orginal one to complete */
    public get promise(): Promise<this>
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

    private async doWork(
        resolve: (value?: Promisable<this>) => void,
        reject: (reason?: any) => void,
        promiseOrValue?: Promisable<T>,
        callback?: (property: AsyncWrapper<T>) => void): Promise<void>
    {
        try
        {
            this._value = await promiseOrValue;
            resolve(this);
            this._success = true;
        }
        catch (error)
        {
            this._error = error;
            reject(error);
            this._success = false;
        }
        finally
        {
            this._complete = true;
            this._completeEvent.invoke(this, this._value);

            if (callback !== undefined)
            {
                callback(this);
            }
        }
    }
}
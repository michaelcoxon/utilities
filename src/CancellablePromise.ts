import SingleInvokeEvent from './SingleInvokeEvent';





export default class CancellablePromise<T> implements PromiseLike<T>
{
    private _cancelled: boolean
    private _watcherPromise: Promise<T>;
    private readonly _finallyEvent = new SingleInvokeEvent<{ promise: Promise<T>, cancelled: boolean }>();

    constructor(promise: PromiseLike<T>)
    {
        this._cancelled = false;

        this._watcherPromise = new Promise<T>(async (resolve, reject) =>
        {
            try
            {
                const value = await promise;
                if (this._cancelled)
                {
                    return;
                }
                resolve(value);
            }
            catch (error)
            {
                if (this._cancelled)
                {
                    return;
                }
                reject(error);
            }
            finally
            {
                this._finallyEvent.invoke(this, {
                    promise: this._watcherPromise,
                    cancelled: this.cancelled
                });
            }
        });
    }

    public get cancelled(): boolean
    {
        return this._cancelled;
    }

    public cancel(): void
    {
        this._cancelled = true;
        // as soon as wee call cancel finalise the promise
        this._finallyEvent.invoke(this, {
            promise: this._watcherPromise,
            cancelled: this.cancelled
        });
    }

    public then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): CancellablePromise<TResult1 | TResult2>
    {
        let promise: Promise<TResult1 | TResult2>;

        if (this._cancelled)
        {
            promise = new Promise(() => { });
        }
        else
        {
            promise = this._watcherPromise.then(onfulfilled, onrejected);
        }

        const cancellable = new CancellablePromise(promise);

        this.finally((p, cancelled) =>
        {
            if (cancelled)
            {
                cancellable.cancel();
            }
        })

        return cancellable;
    }

    public catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): CancellablePromise<T | TResult>
    {
        let promise: Promise<T | TResult>;

        if (this._cancelled)
        {
            promise = new Promise(() => { });
        }
        else
        {
            promise = this._watcherPromise.catch(onrejected);
        }

        const cancellable = new CancellablePromise(promise);

        this.finally((p, cancelled) =>
        {
            if (cancelled)
            {
                cancellable.cancel();
            }
        })

        return cancellable;
    }

    public finally(onfinally?: ((promise: Promise<T>, cancelled: boolean) => void)): this
    {
        if (onfinally)
        {
            this._finallyEvent.addHandler((s, e) => onfinally(e.promise, e.cancelled));
        }
        return this;
    }
}
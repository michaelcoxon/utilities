import CancellationToken from './CancellationToken';
import CancellationTokenSource from './CancellationTokenSource';
import SingleInvokeEvent from './SingleInvokeEvent';

export default class CancellablePromise<T> implements PromiseLike<T>
{
    private _cancellationTokenSource: CancellationTokenSource;
    private _watcherPromise: Promise<T>;
    private readonly _finallyEvent = new SingleInvokeEvent<{ promise: PromiseLike<T>, cancelled: boolean; }>();

    constructor(promise: PromiseLike<T>, cancellationToken?: CancellationToken)
    {
        this._cancellationTokenSource = new CancellationTokenSource(cancellationToken);

        this._watcherPromise = new Promise<T>(async (resolve, reject) =>
        {
            try
            {
                if (this._cancellationTokenSource.isCancellationRequested)
                {
                    return;
                }

                resolve(await promise);
            }
            catch (error)
            {
                reject(error);
            }
            finally
            {
                const _this = this;
                this._finallyEvent.invoke(this, {
                    get promise(): PromiseLike<T> { return promise; },
                    get cancelled(): boolean { return _this.cancelled; }
                });
            }
        });
    }

    public get cancelled(): boolean
    {
        return this._cancellationTokenSource.isCancellationRequested;
    }
    
    public cancel(): void
    {
        this._cancellationTokenSource.cancel();
        // as soon as wee call cancel finalise the promise
        this._finallyEvent.invoke(this, {
            promise: this._watcherPromise,
            cancelled: this.cancelled
        });
    }

    public then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): CancellablePromise<TResult1 | TResult2>
    {
        let promise: Promise<TResult1 | TResult2>;

        if (this._cancellationTokenSource.isCancellationRequested)
        {
            promise = new Promise(() => { });
        }
        else
        {
            promise = this._watcherPromise.then(onfulfilled, onrejected);
        }

        const cancellable = new CancellablePromise(promise, this._cancellationTokenSource.token);

        this.finally((p, cancelled) =>
        {
            if (cancelled)
            {
                cancellable.cancel();
            }
        });

        return cancellable;
    }

    public catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): CancellablePromise<T | TResult>
    {
        let promise: Promise<T | TResult>;

        if (this._cancellationTokenSource)
        {
            promise = new Promise(() => { });
        }
        else
        {
            promise = this._watcherPromise.catch(onrejected);
        }

        const cancellable = new CancellablePromise(promise, this._cancellationTokenSource.token);

        this.finally((p, cancelled) =>
        {
            if (cancelled)
            {
                cancellable.cancel();
            }
        });

        return cancellable;
    }

    public finally(onfinally?: ((promise: PromiseLike<T>, cancelled: boolean) => void)): this
    {
        if (onfinally)
        {
            this._finallyEvent.addHandler((s, e) => onfinally(e.promise, e.cancelled));
        }
        return this;
    }
}
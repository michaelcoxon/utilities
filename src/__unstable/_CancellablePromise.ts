﻿import CancellationToken from '../Promises/CancellationToken';
import CancellationTokenSource from '../Promises/CancellationTokenSource';
import SingleInvokeEvent from '../Events/SingleInvokeEvent';
import noop from '../Utilities/noop';

export default class CancellablePromise<T> implements PromiseLike<T>
{
    #cancellationTokenSource: CancellationTokenSource;
    #watcherPromise: Promise<T>;
    readonly #finallyEvent = new SingleInvokeEvent<{ promise: PromiseLike<T>, cancelled: boolean; }>();

    constructor(promise: PromiseLike<T>, cancellationToken?: CancellationToken)
    {
        this.#cancellationTokenSource = new CancellationTokenSource(cancellationToken);

        this.#watcherPromise = new Promise<T>((resolve, reject) =>
        {
            (async () =>
            {
                try
                {
                    if (this.#cancellationTokenSource.isCancellationRequested)
                    {
                        reject("cancelled");
                        return;
                    }

                    const value = await promise;

                    if (this.#cancellationTokenSource.isCancellationRequested)
                    {
                        reject("cancelled");
                        return;
                    }

                    resolve(value);
                }
                catch (error)
                {
                    reject(error);
                }
                finally
                {
                    const cancelled = () => this.cancelled;

                    this.#finallyEvent.invoke(this,
                        {
                            get promise(): PromiseLike<T>
                            {
                                return promise;
                            },
                            get cancelled(): boolean
                            {
                                return cancelled();
                            }
                        });
                }
            })();
        });
    }

    public get cancelled(): boolean
    {
        return this.#cancellationTokenSource.isCancellationRequested;
    }

    public cancel(): void
    {
        this.#cancellationTokenSource.cancel();
        // as soon as wee call cancel finalise the promise
        this.#finallyEvent.invoke(this, {
            promise: this.#watcherPromise,
            cancelled: this.cancelled
        });
    }

    public then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null | undefined): CancellablePromise<TResult1 | TResult2>
    {
        let promise: Promise<TResult1 | TResult2>;

        if (this.#cancellationTokenSource.isCancellationRequested)
        {
            promise = new Promise(noop);
        }
        else
        {
            promise = this.#watcherPromise.then(onfulfilled, onrejected);
        }

        const cancellable = new CancellablePromise(promise, this.#cancellationTokenSource.token);

        this.finally((p, cancelled) =>
        {
            if (cancelled)
            {
                cancellable.cancel();
            }
        });

        return cancellable;
    }

    public catch<TResult = never>(onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null | undefined): CancellablePromise<T | TResult>
    {
        let promise: Promise<T | TResult>;

        if (this.#cancellationTokenSource)
        {
            promise = new Promise(noop);
        }
        else
        {
            promise = this.#watcherPromise.catch(onrejected);
        }

        const cancellable = new CancellablePromise(promise, this.#cancellationTokenSource.token);

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
            this.#finallyEvent.addHandler((s, e) => onfinally(e.promise, e.cancelled));
        }
        return this;
    }
}

// import assert from 'assert';
// import CancellablePromise from './_CancellablePromise';
// import delay from '../Promises/delay';



// describe("CancellablePromise.construct", () =>
// {
//     it("should construct (default)", async () =>
//     {
//         let storage = 0;

//         const promise = new CancellablePromise<number>((async () =>
//         {
//             await delay(1000);
//             return storage = 1;
//         })());

//         promise.cancel();

//         try
//         {
//             await delay(1000);
//         }
//         catch (e)
//         {
//             expect(promise.cancelled).toBe(true);
//             expect(storage).toBe(0);
//             return;
//         }
//         assert.fail();
//     });
// });    
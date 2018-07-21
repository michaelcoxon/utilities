




export class CancellablePromise<T> implements Promise<T>, PromiseLike<T>
{
    [Symbol.toStringTag]: "Promise";

    private _internalPromise?: Promise<T>;
    private _watcherPromise: Promise<T>;

    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void)
    {
        this._internalPromise = new Promise<T>(executor);
        this._watcherPromise = new Promise<T>(async (resolve, reject) =>
        {
            try
            {
                const value = await this._internalPromise;
                if (this._internalPromise !== undefined)
                {
                    return;
                }
                resolve(value);
            }
            catch (error)
            {
                if (this._internalPromise !== undefined)
                {
                    return;
                }
                reject(error);
            }
        });
    }

    public cancel(): void
    {
        this._internalPromise = undefined;
    }

    public then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>
    {
        return this._watcherPromise.then(onfulfilled, onrejected);
    }

    public catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>
    {
        return this._watcherPromise.catch(onrejected);
    }
}
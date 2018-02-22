/** interface for disposable objects */
export interface IDisposable
{
    dispose(): void;
}

/**
 * creates a disposable object then cleans it up after inner has finished execution. DO NOT USE ON PROMISES!!! use `usingAsync` instead.
 * @param disposableObjectFactory
 * @param inner
 */
export function using<T extends IDisposable, TResult>(disposableObjectFactory: () => T, inner: (disposableObject: T) => TResult): TResult
{
    const disposableObject = disposableObjectFactory();

    try
    {
        return inner(disposableObject);
    }
    finally
    {
        disposableObject.dispose()
    }
}

/**
 * creates a disposable object then cleans it up after inner has resolved.
 * @param disposableObjectFactory
 * @param inner
 */
export async function usingAsync<T extends IDisposable, TResult>(disposableObjectFactory: () => T, inner: (disposableObject: T) => Promise<TResult>): Promise<TResult>
{
    const disposableObject = disposableObjectFactory();

    try
    {
        return await inner(disposableObject);
    }
    finally
    {
        disposableObject.dispose()
    }
}

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


export interface IDisposable
{
    dispose(): void;
}
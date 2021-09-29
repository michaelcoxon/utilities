import { IDisposable } from './Types';

/**
 * Creates a disposable object then cleans it up after inner has finished execution. 
 * DO NOT USE ON PROMISES!!! use `usingAsync` instead.
 * @param disposableObjectFactory
 * @param inner
 */

export default function using<T extends IDisposable, TResult>(disposableObjectFactory: () => T, inner: (disposableObject: T) => TResult): TResult
{
    const disposableObject = disposableObjectFactory();

    try
    {
        return inner(disposableObject);
    }

    finally
    {
        disposableObject.dispose();
    }
}

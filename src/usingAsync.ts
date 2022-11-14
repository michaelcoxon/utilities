import { IDisposable } from './Types.js';

/**
 * creates a disposable object then cleans it up after inner has resolved.
 * @param disposableObjectFactory
 * @param inner
 */

export default function usingAsync<T extends IDisposable, TResult>(disposableObjectFactory: () => T, inner: (disposableObject: T) => Promise<TResult>): Promise<TResult>
{
    return new Promise<TResult>((resolve, reject) =>
    {
        let disposableObject: T | undefined;
        try
        {
            const dO = disposableObject = disposableObjectFactory();

            inner(dO)
                .then(result =>
                {
                    dO.dispose();
                    resolve(result);
                })
                .catch(error =>
                {
                    dO.dispose();
                    reject(error);
                });
        }
        catch (error)
        {
            if (disposableObject)
            {
                disposableObject.dispose();
            }
            reject(error);
        }
    });
}

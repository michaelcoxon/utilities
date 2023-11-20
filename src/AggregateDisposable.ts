import AlreadyDisposedException from './Exceptions/AlreadyDisposedException';
import Exception from './Exceptions/Exception';
import ErrorException from './Exceptions/ErrorException';
import { IDisposable } from './Types';

/** A Disposable that can collect disposable objects and dispose then when it is disposed */
export default class AggregateDisposable implements IDisposable
{
    #disposed = false;
    #disposables: IDisposable[];

    constructor(...disposables: IDisposable[])
    {
        this.#disposables = disposables;
    }

    /** Disposes the objects tracked by this */
    public dispose(): void
    {
        this.#disposed = true;

        for (const disposable of this.#disposables)
        {
            try
            {
                return disposable.dispose();
            }
            catch (ex)
            {
                if (!(ex instanceof AlreadyDisposedException))
                {
                    if (ex instanceof Exception)
                    {
                        throw new Exception("An error occured while disposing an object", ex);
                    }
                    else if (ex instanceof Error)
                    {
                        throw new Exception("An error occured while disposing an object", new ErrorException(ex));
                    }
                    else
                    {
                        throw new Exception(`An error occured while disposing an object: '${ex}'`);
                    }
                }
            }
        }
    }

    public track(disposable: IDisposable)
    {
        if (this.#disposed)
        {
            throw new AlreadyDisposedException();
        }
        this.#disposables.push(disposable);
    }

    public async disposeAsync(): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            try
            {
                for (const disposable of this.#disposables)
                {
                    disposable.dispose();
                }
                resolve();
            }
            catch (ex)
            {
                reject(ex);
            }
        });
    }
}
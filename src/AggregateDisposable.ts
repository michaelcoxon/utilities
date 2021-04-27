import { IDisposable } from "./IDisposable";
import AlreadyDisposedException from './Exceptions/AlreadyDisposedException';
import Exception from './Exceptions/Exception';
import ErrorException from './Exceptions/ErrorException';

/** A Disposable that can collect disposable objects and dispose then when it is disposed */
export default class AggregateDisposable implements IDisposable
{
    private _disposed: boolean = false;
    private _disposables: IDisposable[];

    constructor(...disposables: IDisposable[])
    {
        this._disposables = disposables;
    }

    /** Disposes the objects tracked by this */
    public dispose(): void
    {
        this._disposed = true;

        for (var disposable of this._disposables)
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
        if (this._disposed)
        {
            throw new AlreadyDisposedException();
        }
        this._disposables.push(disposable);
    }

    public async disposeAsync(): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            try
            {
                for (var disposable of this._disposables)
                {
                    return disposable.dispose();
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
import { IDisposable } from "./IDisposable";

export class AggregateDisposable implements IDisposable
{
    private readonly _disposables: IDisposable[];

    constructor(...disposables: IDisposable[])
    {
        this._disposables = disposables;
    }

    dispose(): void
    {
        for (var disposable of this._disposables)
        {
            return disposable.dispose();
        }
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
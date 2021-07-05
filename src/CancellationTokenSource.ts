import CancellationToken from './CancellationToken';
import SingleInvokeEvent from './SingleInvokeEvent';


export default class CancellationTokenSource
{
    private readonly _timeoutables: NodeJS.Timeout[] = [];
    private readonly _cancelledEvent: SingleInvokeEvent<undefined> = new SingleInvokeEvent();
    private _cancelled: boolean = false;

    constructor(cancellationToken?: CancellationToken)
    {
        if (cancellationToken)
        {
            cancellationToken.cancelledEvent.addHandler((s, e) => this.cancel());
        }
    }

    public get isCancellationRequested(): boolean
    {
        return this._cancelled;
    }

    public get token(): CancellationToken
    {
        return new CancellationToken(this._cancelledEvent);
    }

    public cancel(): void
    {
        if (!this._cancelled)
        {
            this._cancelled = true;
            this._timeoutables.forEach(t => clearTimeout(t));
            this._cancelledEvent.invoke(this, undefined);
        }
    }

    public cancelAfter(msTimeout: number): void
    {
        if (!this._cancelled)
        {
            this._timeoutables.push(setTimeout(() =>
            {
                if (!this._cancelled)
                {
                    this.cancel();
                }
            }, msTimeout));
        }
    }
}

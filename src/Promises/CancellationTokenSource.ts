import CancellationToken from './CancellationToken';
import SingleInvokeEvent from '../Events/SingleInvokeEvent';


export default class CancellationTokenSource
{
    readonly #timeoutables: NodeJS.Timeout[] = [];
    readonly #cancelledEvent: SingleInvokeEvent<undefined> = new SingleInvokeEvent();
    #cancelled = false;

    constructor(cancellationToken?: CancellationToken)
    {
        if (cancellationToken)
        {
            cancellationToken.onCancelled.addHandler(() => this.cancel());
        }
    }

    public get isCancellationRequested(): boolean
    {
        return this.#cancelled;
    }

    public get token(): CancellationToken
    {
        return new CancellationToken(this.#cancelledEvent);
    }

    public cancel(): void
    {
        if (!this.#cancelled)
        {
            this.#cancelled = true;
            this.#timeoutables.forEach(timeoutHandle => clearTimeout(timeoutHandle));
            this.#cancelledEvent.invoke(this, undefined);
        }
    }

    public cancelAfter(msTimeout: number): void
    {
        if (!this.#cancelled)
        {
            this.#timeoutables.push(setTimeout(() => this.cancel(), msTimeout));
        }
    }
}

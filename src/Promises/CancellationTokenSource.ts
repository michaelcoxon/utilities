import CancellationToken from './CancellationToken';
import SingleInvokeEvent from '../SingleInvokeEvent';


export default class CancellationTokenSource
{
    readonly #timeoutables: any[] = [];
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
            this.#timeoutables.forEach(t => clearTimeout(t as any));
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

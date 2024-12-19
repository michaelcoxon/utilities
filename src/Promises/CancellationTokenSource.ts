import CancellationToken from './CancellationToken';
import SingleInvokeEvent from '../Events/SingleInvokeEvent';

/**
 * This creates new cancellation tokens that can be cancelled from a single source.
 * You can cascade a cancellation by providing a parent cancellation token in the constructor.
 * Lower level cancellations do not bubble up to parents.
 * `cancelAfter` allows a delay, but it still can be force cancelled with `cancel`
 */
export default class CancellationTokenSource
{
    /** store so that cancelAfter's can be for cancelled */
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

    /**
     * Returns true when this source has been cancelled.
     */
    public get isCancellationRequested(): boolean
    {
        return this.#cancelled;
    }

    /** 
     * Issues a new CancelationToken that is reactive to this 
     * CancellationTokenSource's cancellation 
     */
    public get token(): CancellationToken
    {
        return new CancellationToken(this.#cancelledEvent);
    }

    /**
     * Cancels all issued tokens
     */
    public cancel(): void
    {
        if (!this.#cancelled)
        {
            this.#cancelled = true;
            this.#timeoutables.forEach(timeoutHandle => clearTimeout(timeoutHandle));
            this.#cancelledEvent.invoke(this, undefined);
        }
    }

    /**
     * Cancels all issued tokens after the specified time
     * @param msTimeout milliseconds of time to wait before cancellation
     */
    public cancelAfter(msTimeout: number): void
    {
        if (!this.#cancelled)
        {
            this.#timeoutables.push(setTimeout(() => this.cancel(), msTimeout));
        }
    }
}

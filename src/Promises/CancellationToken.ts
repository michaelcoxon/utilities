import SingleInvokeEvent from '../Events/SingleInvokeEvent';
import { IEvent } from '../Events/_types';

/**
 * A token that is create and can be cancelled externaly by a CancellationTokenSource
 */
export default class CancellationToken
{
    readonly #onCancelled: SingleInvokeEvent<undefined> = new SingleInvokeEvent();
    #cancelled = false;

    /**
     * 
     * @param cancelledEvent 
     */
    constructor(cancelledEvent?: IEvent<undefined>)
    {
        cancelledEvent?.addHandler(() =>
        {
            this.#cancelled = true;
            this.#onCancelled.invoke(this, undefined);
        });
    }

    /**
     * attach handlers here to react to the cancellation 
     */
    public get onCancelled(): IEvent<undefined>
    {
        return this.#onCancelled;
    }

    /**
     * Returns true when the token has been cancelled.
     * The word `Requested` implies clean up and safe exit is allowed.
     */
    public get isCancellationRequested(): boolean
    {
        return this.#cancelled;
    }

    /** a token that is never cancelled */
    public static default: CancellationToken = new CancellationToken();
}

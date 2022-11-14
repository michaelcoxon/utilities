import SingleInvokeEvent from '../Events/SingleInvokeEvent.js';
import { IEvent } from '../Events/_types.js';


export default class CancellationToken
{
    readonly #onCancelled: SingleInvokeEvent<undefined> = new SingleInvokeEvent();
    #cancelled = false;

    /**
     *
     */
    constructor(cancelledEvent?: IEvent<undefined>)
    {
        cancelledEvent?.addHandler(() =>
        {
            this.#cancelled = true;
            this.#onCancelled.invoke(this, undefined);
        });
    }

    public get onCancelled(): IEvent<undefined>
    {
        return this.#onCancelled;
    }

    public get isCancellationRequested(): boolean
    {
        return this.#cancelled;
    }

    public static default: CancellationToken = new CancellationToken();
}

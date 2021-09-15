import { IEvent } from '../Event';
import SingleInvokeEvent from '../SingleInvokeEvent';


export default class CancellationToken
{
    readonly #cancelledEvent: SingleInvokeEvent<undefined> = new SingleInvokeEvent();
    #cancelled = false;

    /**
     *
     */
    constructor(cancelledEvent: IEvent<undefined>)
    {
        cancelledEvent.addHandler(() =>
        {
            this.#cancelled = true;
            this.#cancelledEvent.invoke(this, undefined);
        });
    }

    public get cancelledEvent(): IEvent<undefined>
    {
        return this.#cancelledEvent;
    }

    public get isCancellationRequested(): boolean
    {
        return this.#cancelled;
    }
}

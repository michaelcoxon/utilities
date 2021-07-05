import { IEvent } from './Event';
import SingleInvokeEvent from './SingleInvokeEvent';


export default class CancellationToken
{
    private readonly _cancelledEvent: SingleInvokeEvent<undefined> = new SingleInvokeEvent();
    private _cancelled: boolean = false;

    /**
     *
     */
    constructor(cancelledEvent: IEvent<undefined>)
    {
        cancelledEvent.addHandler((s, e) =>
        {
            this._cancelled = true;
            this._cancelledEvent.invoke(this, undefined);
        });
    }

    public get cancelledEvent(): IEvent<undefined>
    {
        return this._cancelledEvent;
    }

    public get isCancellationRequested(): boolean
    {
        return this._cancelled;
    }
}

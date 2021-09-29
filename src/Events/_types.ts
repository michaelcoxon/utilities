
/** The event handler type */
export type EventHandler<TEventArgs> = (sender: any, args: TEventArgs) => void;

/** An interface to expose an event publicly */
export interface IEvent<TEventArgs>
{
    addHandler(eventHandler: EventHandler<TEventArgs>): EventHandler<TEventArgs>;
    removeHandler(eventHandler: EventHandler<TEventArgs>): void;
}
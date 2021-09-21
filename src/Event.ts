import ArgumentException from "./Exceptions/ArgumentException";
import { EventHandler, IEvent } from "./Types";

/**
 * Class to represent an event.
 */
export default class Event<TEventArgs> implements IEvent<TEventArgs>
{
    readonly #eventHandlers: EventHandler<TEventArgs>[];

    /**
     * Creates a new event
     */
    constructor()
    {
        this.#eventHandlers = [];
    }

    /**
     * Invokes the event
     * @param sender the object that is calling invoke
     * @param args the arguments to send along with the event.
     */
    public invoke(sender: any, args: TEventArgs)
    {
        for (const eventHandler of this.#eventHandlers)
        {
            eventHandler.call(sender, sender, args);
        }
    }

    /**
     * Adds a handler to the event
     * @param eventHandler
     */
    public addHandler(eventHandler: EventHandler<TEventArgs>): EventHandler<TEventArgs>
    {
        this.#eventHandlers.push(eventHandler);
        return eventHandler;
    }

    /**
     * removes a handler from the event.
     * @param eventHandler
     */
    public removeHandler(eventHandler: EventHandler<TEventArgs>): void
    {
        const index = this.#eventHandlers.indexOf(eventHandler);

        if (index != -1)
        {
            this.#eventHandlers.splice(index, 1);
        }
        else
        {
            throw new ArgumentException('eventHandler', "Handler is not in this Event");
        }
    }
}
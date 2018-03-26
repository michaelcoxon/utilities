import { ArgumentException, ArgumentUndefinedException } from "./Exceptions";
import { EventHandler } from ".";

/**
 * Class to represent an event.
 */
export class Event<TEventArgs>
{
    private readonly _eventHandlers: EventHandler<TEventArgs>[];

    /**
     * Creates a new event
     */
    constructor()
    {
        this._eventHandlers = [];
    }

    /**
     * Invokes the event
     * @param sender the object that is calling invoke
     * @param args the arguments to send along with the event.
     */
    public invoke(sender: any, args: TEventArgs)
    {
        for (let eventHandler of this._eventHandlers)
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
        this._eventHandlers.push(eventHandler);
        return eventHandler;
    }

    /**
     * removes a handler from the event.
     * @param eventHandler
     */
    public removeHandler(eventHandler: EventHandler<TEventArgs>): void
    {
        var index = this._eventHandlers.indexOf(eventHandler);

        if (index != -1)
        {
            this._eventHandlers.splice(index, 1);
        }
        else
        {
            throw new ArgumentException('eventHandler', "Handler is not in this Event");
        }
    }
}
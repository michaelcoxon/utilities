import AlreadyDisposedException from '../Exceptions/AlreadyDisposedException.js';
import ArgumentException from "../Exceptions/ArgumentException.js";
import { IDisposable } from '../Types.js';
import { IEvent, EventHandler } from './_types.js';
/**
 * Class to represent an event.
 */
export default class Event<TEventArgs> implements IEvent<TEventArgs>, IDisposable
{
    #disposed = false;

    readonly #eventHandlers: EventHandler<TEventArgs>[] = [];

    /**
     * Invokes the event
     * @param sender the object that is calling invoke
     * @param args the arguments to send along with the event.
     */
    invoke(sender: any, args: TEventArgs)
    {
        if (this.#disposed)
        {
            throw new AlreadyDisposedException();
        }

        for (const eventHandler of this.#eventHandlers)
        {
            if (this.#disposed)
            {
                throw new AlreadyDisposedException();
            }
            eventHandler.call(sender, sender, args);
        }
    }

    /**
     * Adds a handler to the event
     * @param eventHandler
     */
    addHandler(eventHandler: EventHandler<TEventArgs>): EventHandler<TEventArgs>
    {
        if (this.#disposed)
        {
            throw new AlreadyDisposedException();
        }

        this.#eventHandlers.push(eventHandler);
        return eventHandler;
    }

    /**
     * removes a handler from the event.
     * @param eventHandler
     */
    removeHandler(eventHandler: EventHandler<TEventArgs>): void
    {
        if (this.#disposed)
        {
            throw new AlreadyDisposedException();
        }

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

    dispose(): void
    {
        if (!this.#disposed)
        {
            this.#disposed = true;
            this.#eventHandlers.length = 0;
        }
    }
}
import Event from "./Event";
import NullReferenceException from '../Exceptions/NullReferenceException';
import ArgumentUndefinedException from '../Exceptions/ArgumentUndefinedException';
import ArgumentNullException from '../Exceptions/ArgumentNullException';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import { EventHandler, IEvent } from './_types';

/**
 * An event type that can only be invoked once. Once the event
 * is invoked, and handler that is added to it will be immediately
 * executed. All subsequent invocations are ignored
 */
export default class SingleInvokeEvent<TEventArgs> extends Event<TEventArgs> implements IEvent<TEventArgs>
{
    /** event has been fired */
    #fired: boolean;
    /** the firing sender */
    #sender?: any;
    /** the firing args */
    #args?: TEventArgs;

    /**
     * Create a new singly invokable event.
     */
    constructor()
    {
        super();
        this.#fired = false;
    }

    // Add a handler to the event
    public addHandler(eventHandler: EventHandler<TEventArgs>): EventHandler<TEventArgs>
    {
        super.addHandler(eventHandler);

        if (this.#fired)
        {
            if (isUndefinedOrNull(this.#args))
            {
                throw new NullReferenceException("FATAL There are no args - this is not possible. Report this bug.");
            }
            eventHandler.call(this.#sender, this.#sender, this.#args);
        }

        return eventHandler;
    }

    // invoke the event
    public invoke(sender: any, args: TEventArgs)
    {
        /// <signature>
        /// <summary>Invoke the event handlers</summary>
        /// <param type='Object' name='sender'>The object that raised/owns the event</param>
        /// <param type='Object' name='sender'>Any to be passed as arguments to the handlers</param>
        /// </signature>
        if (this.#fired)
        {
            return;
        }
        if (isUndefinedOrNull(args))
        {
            throw new ArgumentUndefinedException("args", new ArgumentNullException("args"));
        }

        this.#fired = true;
        this.#sender = sender;
        this.#args = args;

        super.invoke(sender, args);
    }
}

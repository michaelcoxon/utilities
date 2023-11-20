import Event from "../Events/Event";
import { EventHandler } from '../Events/_types';
import Guid from '../Guid';
import { Undefinable } from "../Types";
import { IModelState } from "./IModelState";


export default abstract class BaseModelState<T extends any> implements IModelState<T>
{
    readonly #postHandlers: Record<string, EventHandler<Undefinable<T>>>;
    readonly #preHandlers: Record<string, EventHandler<Undefinable<T>>>;
    readonly #updatedEvent: Event<Undefinable<T>>;
    readonly #updatingEvent: Event<Undefinable<T>>;

    #value: Undefinable<T>;

    constructor(value?: T)
    {
        this.#value = value;

        this.#preHandlers = {};
        this.#postHandlers = {};
        this.#updatedEvent = new Event();
        this.#updatingEvent = new Event();
    }

    /**
     * Creates a subscription to the ModelState that will be called when
     * the state is updated.
     *
     * @param callback The callback to be invoked when the state is updated
     * @returns A symbol that must saved to unsubscribe from the ModelState
     */
    public subscribe(postCallback: (value: Undefinable<T>) => void, preCallback?: (value: Undefinable<T>) => void): string
    {
        return this.subscribeCore(postCallback, preCallback, true);
    }

    /**
     * Unsubscribes a component from the model state.
     *
     * @param key The symbol that was returned from the subscribe method.
     */
    public unsubscribe(key: string): void
    {
        const postHandler = this.#postHandlers[key];
        if (postHandler)
        {
            this.#updatedEvent.removeHandler(postHandler);
            delete this.#postHandlers[key];
        }

        const preHandler = this.#preHandlers[key];
        if (preHandler)
        {
            this.#updatingEvent.removeHandler(preHandler);
            delete this.#preHandlers[key];
        }
    }

    /** Gets the current value of the ModelState */
    public get value(): Undefinable<T>
    {
        return this.#value;
    }

    /** Returns the current value of the ModelState */
    public valueOf(): Undefinable<T>
    {
        return this.#value;
    }

    /** Returns the string version of the ModelState value */
    public toString(): string
    {
        return `${this.#value}`;
    }

    /** Returns the ModelState as a Promise */
    public async toPromise(): Promise<Undefinable<T>>
    {
        return await new Promise((resolve, reject) =>
        {
            const subscription = this.subscribe((value) =>
            {
                try
                {
                    resolve(value);
                }
                catch (ex)
                {
                    reject(ex);
                }
                finally
                {
                    this.unsubscribe(subscription);
                }
            });
        });
    }

    protected subscribeCore(postCallback: (value: Undefinable<T>) => void, preCallback?: (value: Undefinable<T>) => void, publishCurrentValue = true): string
    {
        const key = Guid.newGuid().toString();

        const postHandler: EventHandler<Undefinable<T>> = (s, e) => postCallback(e);
        this.#postHandlers[key] = postHandler;
        this.#updatedEvent.addHandler(postHandler);

        if (preCallback)
        {
            const preHandler: EventHandler<Undefinable<T>> = (s, e) => preCallback(e);
            this.#preHandlers[key] = preHandler;
            this.#updatingEvent.addHandler(preHandler);
        }

        if (publishCurrentValue)
        {
            postCallback(this.#value);
        }

        return key;
    }

    protected getValue(): Undefinable<T>
    {
        return this.#value;
    }

    protected setValue(value: Undefinable<T>): void
    {
        this.#onUpdating();
        this.#value = value;
        this.#onUpdated();
    }

    /** Invokes the subscriptions with the current value */
    readonly #onUpdated = () =>
    {
        this.#updatedEvent.invoke(this, this.#value);
    };

    readonly #onUpdating = () =>
    {
        this.#updatingEvent.invoke(this, this.#value);
    };
}

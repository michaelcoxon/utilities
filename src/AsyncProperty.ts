
import { Event } from "./Event";
import { NullReferenceException } from './Exceptions';
import { EventHandler, Undefinable } from './Types';




class AsyncProperty<T extends any>
{
    private readonly _postHandlers: { [key: string]: EventHandler<Undefinable<T>> }
    private readonly _preHandlers: { [key: string]: EventHandler<Undefinable<T>> }
    private readonly _updatedEvent: Event<Undefinable<T>>;
    private readonly _updatingEvent: Event<Undefinable<T>>;
    private readonly _getAsync: () => Promise<T>;
    private readonly _setAsync: (value: T) => Promise<void>;
    private readonly _updater: () => Promise<void>;

    protected _value: Undefinable<T>;

    constructor(getAsync: () => Promise<T>, setAsync: (value: T) => Promise<void>, updateNow: boolean = true)
    {
        this._getAsync = getAsync;
        this._setAsync = setAsync;

        this._value = undefined;

        this._preHandlers = {};
        this._postHandlers = {};
        this._updatedEvent = new Event();
        this._updatingEvent = new Event();

        this._updater = async () =>
        {
            this._onUpdating();

            this._value = await this._getAsync();

            this._onUpdated();
        }

        if (updateNow)
        {
            this._updater();
        }
    }

    /**
     * Creates a subscription to the ModelState that will be called when
     * the state is updated.
     * 
     * @param callback The callback to be invoked when the state is updated
     * @returns A symbol that must saved to unsubscribe from the ModelState
     */
    public subscribe(postCallback: (value: Undefinable<T>) => void, preCallback?: (value: Undefinable<T>) => void): symbol
    {
        const key: symbol = Symbol();

        const postHandler: EventHandler<Undefinable<T>> = (s, e) => postCallback(e);
        this._postHandlers[Symbol.keyFor(key)!] = postHandler;
        this._updatedEvent.addHandler(postHandler);

        if (preCallback)
        {
            const preHandler: EventHandler<Undefinable<T>> = (s, e) => preCallback(e);
            this._preHandlers[Symbol.keyFor(key)!] = preHandler;
            this._updatingEvent.addHandler(preHandler);
        }

        postCallback(this.value);

        return key;
    }

    /**
     * Unsubscribes a component from the model state.
     * 
     * @param key The symbol that was returned from the subscribe method.
     */
    public unsubscribe(key: symbol): void
    {
        const postHandler = this._postHandlers[Symbol.keyFor(key)!];
        if (postHandler)
        {
            this._updatedEvent.removeHandler(postHandler);
            delete this._postHandlers[Symbol.keyFor(key)!];
        }

        const preHandler = this._preHandlers[Symbol.keyFor(key)!];
        if (preHandler)
        {
            this._updatingEvent.removeHandler(preHandler);
            delete this._preHandlers[Symbol.keyFor(key)!];
        }
    }

    /** Gets the current value of the ModelState */
    public get value(): T
    {
        if (this._value === undefined)
        {
            throw new NullReferenceException("value is undefined");
        }
        return this._value;
    }

    public set value(value: T)
    {
        this._value = value;
        this._setAsync(value);
    }

    /** Returns the current value of the ModelState */
    public valueOf(): Undefinable<T>
    {
        return this._value;
    }

    /** Returns the string version of the ModelState value */
    public toString(): string
    {
        return this._value !== undefined
            ? this._value.toString()
            : undefined
            ;
    }


    public update(): void
    {
        this._updater();
    }

    /** Invokes the subscriptions with the current value */
    protected _onUpdated()
    {
        this._updatedEvent.invoke(this, this.value);
    }

    protected _onUpdating()
    {
        this._updatingEvent.invoke(this, this.value);
    }
}
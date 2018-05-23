import { Undefinable, EventHandler } from "./Types";
import { Event } from "./Event";


/** Provides a mutatable state that can update registered components to the state */
export class ModelState<T>{

    private readonly _handlers: { [key: string]: EventHandler<Undefinable<T>> }
    private readonly _updateEvent: Event<Undefinable<T>>;

    private _value: Undefinable<T>;

    /** Creates a new ModelState */
    constructor();
    /**
     * Creates a new ModelState
     * 
     * @param initialValue The initial value of the state
     */
    constructor(initialValue: T);
    constructor(initialValue?: T)
    {
        this._value = initialValue;

        this._handlers = {};
        this._updateEvent = new Event();
    }

    /**
     * Creates a subscription to the ModelState that will be called when
     * the state is updated.
     * 
     * @param callback The callback to be invoked when the state is updated
     * @returns A symbol that must saved to unsubscribe from the ModelState
     */
    public subscribe(callback: (value: Undefinable<T>) => void): symbol
    {
        const key: symbol = Symbol();
        const handler: EventHandler<Undefinable<T>> = (s, e) => callback(e);

        this._handlers[Symbol.keyFor(key)!] = handler;
        this._updateEvent.addHandler(handler);

        callback(this.value);

        return key;
    }

    /**
     * Unsubscribes a component from the model state.
     * 
     * @param key The symbol that was returned from the subscribe method.
     */
    public unsubscribe(key: symbol): void
    {
        const handler = this._handlers[Symbol.keyFor(key)!];

        this._updateEvent.removeHandler(handler);

        delete this._handlers[Symbol.keyFor(key)!];
    }

    /** Gets the current value of the ModelState */
    public get value(): Undefinable<T>
    {
        return this._value;
    }

    /** Sets the current value of the ModelState and invokes all subscriptions */
    public set value(value: Undefinable<T>)
    {
        this._value = value;
        this._onUpdated();
    }

    /** Returns the current value of the ModelState */
    public valueOf(): Undefinable<T>
    {
        return this.value;
    }

    /** Returns the string version of the ModelState value */
    public toString(): string
    {
        return this.value!.toString();
    }

    /** Invokes the subscriptions with the current value */
    protected _onUpdated()
    {
        this._updateEvent.invoke(this, this.value);
    }
}
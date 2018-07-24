import 'tslib';

import { Undefinable, EventHandler, Promisable } from "./Types";
import { Event } from "./Event";
import { IDisposable } from './IDisposable';


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

export class PollingModelState<T> implements IDisposable
{
    private readonly _handlers: { [key: string]: EventHandler<Undefinable<T>> }
    private readonly _updateEvent: Event<Undefinable<T>>;
    private readonly _promiseOrValueFactory: (() => Promisable<T>);

    private _value: Undefinable<T>;
    private _timeout: any;

    /**
    * Creates a new PollingModelState
    * @param valueFactory can be a value factory
    */
    constructor(valueFactory: () => T, timeout: number);
    /**
      * Creates a new PollingModelState
      * @param promiseFactory can be a promise factory
      */
    constructor(promiseFactory: () => Promise<T>, timeout: number);
    /**
    * Creates a new PollingModelState
    * @param promiseOrValueFactory can be a promise or a value factory, a value or a promise that will be invoked immediately
    */
    constructor(promiseOrValueFactory: (() => Promisable<T>), timeout: number);
    constructor(promiseOrValueFactory: (() => Promisable<T>), timeout: number)
    {
        this._promiseOrValueFactory = promiseOrValueFactory;
        this._handlers = {};
        this._updateEvent = new Event();

        const worker = async () =>
        {
            this._value = await promiseOrValueFactory();
            this._updateEvent.invoke(this, this._value);
            this._timeout = setTimeout(worker, timeout);
        }

        worker();
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

    public dispose()
    {
        if (this._timeout)
        {
            clearTimeout(this._timeout);
        }
    }

    /** Invokes the subscriptions with the current value */
    protected _onUpdated()
    {
        this._updateEvent.invoke(this, this.value);
    }
}


export class FactoryModelState<T>
{
    private readonly _updater: () => Promise<void>;
    private readonly _postHandlers: { [key: string]: EventHandler<Undefinable<T>> }
    private readonly _preHandlers: { [key: string]: EventHandler<Undefinable<T>> }
    private readonly _updatedEvent: Event<Undefinable<T>>;
    private readonly _updatingEvent: Event<Undefinable<T>>;
    private readonly _promiseOrValueFactory: (() => Promisable<T>);

    private _value: Undefinable<T>;

    /**
    * Creates a new PollingModelState
    * @param valueFactory can be a value factory
    */
    constructor(valueFactory: () => T);
    /**
      * Creates a new PollingModelState
      * @param promiseFactory can be a promise factory
      */
    constructor(promiseFactory: () => Promise<T>);
    /**
    * Creates a new PollingModelState
    * @param promiseOrValueFactory can be a promise or a value factory, a value or a promise that will be invoked immediately
    */
    constructor(promiseOrValueFactory: (() => Promisable<T>));
    constructor(promiseOrValueFactory: (() => Promisable<T>))
    {
        this._promiseOrValueFactory = promiseOrValueFactory;
        this._postHandlers = {};
        this._preHandlers = {};
        this._updatedEvent = new Event();
        this._updatingEvent = new Event();

        this._updater = async () =>
        {
            this._onUpdating();

            this._value = await promiseOrValueFactory();

            this._onUpdated();
        }

        this._updater();
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
    public get value(): Undefinable<T>
    {
        return this._value;
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
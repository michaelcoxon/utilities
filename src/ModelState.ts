import 'tslib';

import { Undefinable, EventHandler, Promisable } from "./Types";
import { Event } from "./Event";
import { IDisposable } from './IDisposable';

interface IModelState<T>
{
    subscribe(postCallback: (value: Undefinable<T>) => void, preCallback?: (value: Undefinable<T>) => void): symbol
    unsubscribe(key: symbol): void
    toString(): string
    readonly value: Undefinable<T>
    valueOf(): Undefinable<T>
}

abstract class BaseModelState<T> implements IModelState<T>
{
    private readonly _postHandlers: { [key: string]: EventHandler<Undefinable<T>> }
    private readonly _preHandlers: { [key: string]: EventHandler<Undefinable<T>> }
    private readonly _updatedEvent: Event<Undefinable<T>>;
    private readonly _updatingEvent: Event<Undefinable<T>>;

    protected _value: Undefinable<T>;

    constructor()
    {
        this._value = undefined;

        this._preHandlers = {};
        this._postHandlers = {};
        this._updatedEvent = new Event();
        this._updatingEvent = new Event();
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


/** Provides a mutatable state that can update registered components to the state */
export class ModelState<T> extends BaseModelState<T> implements IModelState<T>
{
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
        super();
        this._value = initialValue;
    }


    /** Sets the current value of the ModelState and invokes all subscriptions */
    public set value(value: Undefinable<T>)
    {
        this._onUpdating();
        this._value = value;
        this._onUpdated();
    }
}

export class PollingModelState<T> extends BaseModelState<T> implements IDisposable, IModelState<T>
{
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
        super();

        const worker = async () =>
        {
            this._onUpdating();
            this._value = await promiseOrValueFactory();
            this._onUpdated();
            this._timeout = setTimeout(worker, timeout);
        }

        worker();
    }

    public dispose()
    {
        if (this._timeout)
        {
            clearTimeout(this._timeout);
        }
    }
}


export class FactoryModelState<T> extends BaseModelState<T> implements IModelState<T>
{
    private readonly _updater: () => Promise<void>;

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
        super();

        this._updater = async () =>
        {
            this._onUpdating();

            this._value = await promiseOrValueFactory();

            this._onUpdated();
        }

        this._updater();
    }

    public set value(value: Undefinable<T>)
    {
        this._value = value;
    }

    public update(): void
    {
        this._updater();
    }
}
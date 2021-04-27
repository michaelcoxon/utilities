import Event from "../Event";
import Guid from '../Guid';
import { EventHandler, Undefinable } from "../Types";
import { IModelState } from './ModelState';


export default abstract class BaseModelState<T extends any> implements IModelState<T>
{
    private readonly _postHandlers: { [key: string]: EventHandler<Undefinable<T>>; };
    private readonly _preHandlers: { [key: string]: EventHandler<Undefinable<T>>; };
    private readonly _updatedEvent: Event<Undefinable<T>>;
    private readonly _updatingEvent: Event<Undefinable<T>>;

    private _value: Undefinable<T>;

    constructor(value?: T)
    {
        this._value = value;

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
        const postHandler = this._postHandlers[key];
        if (postHandler)
        {
            this._updatedEvent.removeHandler(postHandler);
            delete this._postHandlers[key];
        }

        const preHandler = this._preHandlers[key];
        if (preHandler)
        {
            this._updatingEvent.removeHandler(preHandler);
            delete this._preHandlers[key];
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
        return this._value;
    }

    /** Returns the string version of the ModelState value */
    public toString(): string
    {
        return `${this._value}`;
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

    protected subscribeCore(postCallback: (value: Undefinable<T>) => void, preCallback?: (value: Undefinable<T>) => void, publishCurrentValue: boolean = true): string
    {
        const key = Guid.newGuid().toString();

        const postHandler: EventHandler<Undefinable<T>> = (s, e) => postCallback(e);
        this._postHandlers[key] = postHandler;
        this._updatedEvent.addHandler(postHandler);

        if (preCallback)
        {
            const preHandler: EventHandler<Undefinable<T>> = (s, e) => preCallback(e);
            this._preHandlers[key] = preHandler;
            this._updatingEvent.addHandler(preHandler);
        }

        if (publishCurrentValue)
        {
            postCallback(this._value);
        }

        return key;
    }

    protected getValue(): Undefinable<T>
    {
        return this._value;
    }

    protected setValue(value: Undefinable<T>): void
    {
        this._onUpdating();
        this._value = value;
        this._onUpdated();
    }

    /** Invokes the subscriptions with the current value */
    private _onUpdated()
    {
        this._updatedEvent.invoke(this, this._value);
    }

    private _onUpdating()
    {
        this._updatingEvent.invoke(this, this._value);
    }
}

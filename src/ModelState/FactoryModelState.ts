import CancellablePromise from '../Promises/CancellablePromise';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import { Awaitable, Undefinable } from "../Types";
import BaseModelState from './BaseModelState';


export default class FactoryModelState<T> extends BaseModelState<T>
{
    readonly #updater: () => Promise<void>;
    #currentPromise?: CancellablePromise<void>;
    /**
    * Creates a new PollingModelState
    * @param valueFactory can be a value factory
    */
    constructor(valueFactory: () => T, updateNow?: boolean);
    /**
      * Creates a new PollingModelState
      * @param promiseFactory can be a promise factory
      */
    constructor(promiseFactory: () => Promise<T>, updateNow?: boolean);
    /**
    * Creates a new PollingModelState
    * @param promiseOrValueFactory can be a promise or a value factory, a value or a promise that will be invoked immediately
    */
    constructor(promiseOrValueFactory: (() => Awaitable<T>), updateNow?: boolean);
    constructor(promiseOrValueFactory: (() => Awaitable<T>), updateNow = true)
    {
        super();

        this.#updater = (async () =>
        {
            this.setValue(await promiseOrValueFactory());
        }).bind(this);

        if (updateNow)
        {
            this.update();
        }
    }

    public subscribe(postCallback: (value: Undefinable<T>) => void, preCallback?: (value: Undefinable<T>) => void): string
    {
        const key = super.subscribeCore(postCallback, preCallback, false);

        if (this.#currentPromise)
        {
            this.#waitForPromise(() => postCallback(this.value));
        }

        else
        {
            postCallback(this.value);
        }

        return key;
    }


    /** Gets the current value of the ModelState */
    public get value(): Undefinable<T>
    {
        return this.getValue();
    }

    public set value(value: Undefinable<T>)
    {
        this.setValue(value);
    }

    public update(): void
    {
        if (this.#currentPromise)
        {
            this.#currentPromise.cancel();
        }
        this.#currentPromise = new CancellablePromise(this.#updater());
    }

    readonly #waitForPromise = (then: () => void) =>
    {
        if(isUndefinedOrNull(this.#currentPromise))
        {
            return Promise.resolve().then(then);
        }
        return this.#currentPromise
            .then(then)
            .finally((promise, cancelled) =>
            {
                if (cancelled)
                {
                    this.#waitForPromise(then);
                }
            });
    }
}

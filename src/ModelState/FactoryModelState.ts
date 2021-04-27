import CancellablePromise from '../CancellablePromise';
import { Promisable, Undefinable } from "../Types";
import BaseModelState from './BaseModelState';


export default class FactoryModelState<T> extends BaseModelState<T>
{
    private readonly _updater: () => Promise<void>;
    private _currentPromise?: CancellablePromise<void>;
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
    constructor(promiseOrValueFactory: (() => Promisable<T>), updateNow?: boolean);
    constructor(promiseOrValueFactory: (() => Promisable<T>), updateNow: boolean = true)
    {
        super();

        this._updater = (async () =>
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

        if (this._currentPromise)
        {
            this._waitForPromise(() => postCallback(this.value));
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
        if (this._currentPromise)
        {
            this._currentPromise.cancel();
        }
        this._currentPromise = new CancellablePromise(this._updater());
    }

    private _waitForPromise(then: () => void): void
    {
        this._currentPromise!
            .then(then)
            .finally((promise, cancelled) =>
            {
                if (cancelled)
                {
                    this._waitForPromise(then);
                }
            });
    }
}

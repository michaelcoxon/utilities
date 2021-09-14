import { IDisposable } from '../IDisposable';
import { Awaitable } from "../Types";
import BaseModelState from './BaseModelState';
import { IModelState } from './ModelState';


export default class PollingModelState<T> extends BaseModelState<T> implements IDisposable, IModelState<T>
{
    #timeout?: unknown;

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
    constructor(promiseOrValueFactory: (() => Awaitable<T>), timeout: number);
    constructor(promiseOrValueFactory: (() => Awaitable<T>), timeout: number)
    {
        super();

        const worker = (async () =>
        {
            this.setValue(await promiseOrValueFactory());
            this.#timeout = setTimeout(worker, timeout);
        }).bind(this);

        worker();
    }

    public dispose()
    {
        if (this.#timeout)
        {
            clearTimeout(this.#timeout as any);
        }
    }
}

import 'tslib';

import { Undefinable } from "./Types";

/** Lazy value provider for promises */
export default class LazyAsync<T>
{
    private readonly _factory: () => Promise<T>;
    private _value: Undefinable<Promise<T>>;

    /**
     * Creates a new instance of the LazyAsync
     * @param factory The factory that creates the promise to be resolved
     */
    constructor(factory: () => Promise<T>)
    {
        this._factory = factory;
    }

    /** Returns the promise if it is already constructed or constructs the promise and returns it */
    public get value(): Promise<T>
    {
        if (this._value !== undefined)
        {
            return this._value;
        }
        else
        {
            return this._value = this._factory();
        }
    }

    /** Returns true if the promise has been created */
    public get isValueCreated(): boolean
    {
        return this._value !== undefined;
    }
}
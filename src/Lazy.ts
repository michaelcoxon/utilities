import { Undefinable } from "./Types";

/**
 * Lazy wrapper for a factory.
 */
export default class Lazy<T>
{
    readonly #factory: () => T;
    #value: Undefinable<T>;

    constructor(factory: () => T)
    {
        this.#factory = factory;
    }

    public get value(): T
    {
        return this.#value || (this.#value = this.#factory());
    }

    public get isValueCreated(): boolean
    {
        return this.#value !== undefined;
    }
}

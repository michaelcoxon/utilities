import { isUndefined } from '.';
import { Undefinable } from "./Types";

/**
 * Lazy wrapper for a factory.
 */
export default class Lazy<T>
{
    readonly #factory: () => T;
    #value: Undefinable<T>;
    #waitForValue: boolean;
    #valueCreated = false;

    /**
     * Create a new Lazy object that invokes the factory when 
     * `value` is called for the first time.
     * 
     * By default, if the factory returns `undefined`, the value of
     * `isValueCreated` will not be true. To alter this set 
     * `waitForValue` to false.
     */
    constructor(factory: () => T, waitForValue = true)
    {
        this.#factory = factory;
        this.#waitForValue = waitForValue;
    }

    /**
     * Get or create the value.
     */
    public get value(): Undefinable<T>
    {
        if (isUndefined(this.#value) && !this.#valueCreated)
        {
            this.#value = this.#factory();

            if (isUndefined(this.#value) && !this.#waitForValue)
            {
                this.#valueCreated = true;
            }
        }
        return this.#value;
    }

    /**
     * Returns `true` if the value has been created.
     */
    public get isValueCreated(): boolean
    {
        return this.#valueCreated || this.#value !== undefined;
    }
}

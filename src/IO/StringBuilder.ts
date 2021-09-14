import { empty, newLine } from '../Strings/_consts';
import { Undefinable } from '../Types';

/**
 * Class for building strings that will only concatenate them upon calling toString().
 */
export default class StringBuilder 
{
    readonly #strings: string[];

    #lastValue: Undefinable<string>;
    #invalidateLastValue: boolean;
    /**
     * Create a new StringBuilder.
     * @param value
     */
    constructor(...value: string[])
    {
        this.#strings = [...value];
        this.#invalidateLastValue = true;
    }

    /**
     * Append the value to the builder
     * @param value
     */
    public append(value: string): void
    {
        this.#strings.push(value);
        this.#invalidateLastValue = true;
    }

    /**
     * Appends the value to the builder with a new line afterwards.
     * @param value
     */
    public appendLine(value: string): void
    {
        this.#strings.push(...[value, newLine]);
        this.#invalidateLastValue = true;
    }

    /**
     * Clears all values from the StringBuilder.
     */
    public clear(): void
    {
        this.#strings.length = 0;
        this.#invalidateLastValue = true;
    }

    /**
     * Returns a string representation of the StringBuilder.
     */
    public toString(): string
    {
        if (this.#invalidateLastValue)
        {
            this.#invalidateLastValue = false;
            return this.#lastValue = this.#strings.join(empty);
        }
        else
        {
            return this.#lastValue || empty;
        }
    }
}


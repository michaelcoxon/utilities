import Strings from '../Strings';
import { Undefinable } from '../Types';

/**
 * Class for building strings that will only concatenate them upon calling toString().
 */
export default class StringBuilder 
{
    private readonly _strings: string[];

    private _lastValue: Undefinable<string>;
    private _invalidateLastValue: boolean;
    /**
     * Create a new StringBuilder.
     * @param value
     */
    constructor(...value: string[])
    {
        this._strings = [...value];
        this._invalidateLastValue = true;
    }

    /**
     * Append the value to the builder
     * @param value
     */
    public append(value: string): void
    {
        this._strings.push(value);
        this._invalidateLastValue = true;
    }

    /**
     * Appends the value to the builder with a new line afterwards.
     * @param value
     */
    public appendLine(value: string): void
    {
        this._strings.push(...[value, Strings.newLine]);
        this._invalidateLastValue = true;
    }

    /**
     * Clears all values from the StringBuilder.
     */
    public clear(): void
    {
        this._strings.length = 0;
        this._invalidateLastValue = true;
    }

    /**
     * Returns a string representation of the StringBuilder.
     */
    public toString(): string
    {
        if (this._invalidateLastValue)
        {
            this._invalidateLastValue = false;
            return this._lastValue = this._strings.join(Strings.empty);
        }
        else
        {
            return this._lastValue || Strings.empty;
        }
    }
}


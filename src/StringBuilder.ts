import { Strings } from './Strings';
import { Undefinable } from './Types';

/**
 * Class for building strings that will only concatenate them upon calling toString().
 */
export class StringBuilder 
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
        if (value !== undefined)
        {
            this._strings = [...value];
        }
        else
        {
            this._strings = [];
        }

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

/**
 * Class for building strings that will only concatenate them upon calling toString().
 */
export class IndentedStringBuilder 
{
    private readonly _strings: { indent: number, value: string }[];

    private _lastValue: Undefinable<string>;
    private _invalidateLastValue: boolean;
    private _indentationLevel: number;

    public indentationString: string = "\t";

    /**
     * Create a new StringBuilder.
     * @param value
     */
    constructor(indentationLevel: number, ...value: string[])
    {
        this._indentationLevel = indentationLevel;

        if (value !== undefined)
        {
            this._strings = value.map(s => ({ indent: this._indentationLevel, value: s }));
        }
        else
        {
            this._strings = [];
        }

        this._invalidateLastValue = true;
    }

    /**
     * Appends the value to the builder with a new line afterwards.
     * @param value
     */
    public appendLine(value: string): void
    {
        this._strings.push({ indent: this._indentationLevel, value: value });
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

    /** adds an indent level */
    public indent(): void
    {
        this._indentationLevel++;
    }

    /** Removes the current indent */
    public unindent(): void
    {
        this._indentationLevel--;
        if (this._indentationLevel < 0)
        {
            this._indentationLevel = 0;
        }
    }

    /**
     * Returns a string representation of the StringBuilder.
     */
    public toString(): string
    {
        if (this._invalidateLastValue)
        {
            this._invalidateLastValue = false;
            return this._lastValue = this._strings
                .map(sv => [this.indentationString.repeat(sv.indent), sv.value])
                .reduce((p, c) => [p, ...c].join(Strings.empty), Strings.empty);
        }
        else
        {
            return this._lastValue || Strings.empty;
        }
    }
}
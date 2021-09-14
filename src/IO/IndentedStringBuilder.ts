import { empty, newLine } from '../Strings/_consts';
import { Undefinable } from '../Types';

/**
 * Class for building strings that will only concatenate them upon calling toString().
 */

export default class IndentedStringBuilder
{
    readonly #strings: { indent: number; value: string; }[];

    #lastValue: Undefinable<string>;
    #invalidateLastValue: boolean;
    #indentationLevel: number;

    public indentationString = "\t";

    /**
     * Create a new StringBuilder.
     * @param lines
     */
    constructor(indentationLevel: number, ...lines: string[])
    {
        this.#indentationLevel = indentationLevel;
        this.#strings = lines.map(s => ({ indent: this.#indentationLevel, value: s + newLine }));
        this.#invalidateLastValue = true;
    }

    /**
     * Appends the value to the builder with a new line afterwards.
     * @param value
     */
    public appendLine(value: string): void
    {
        this.#strings.push({ indent: this.#indentationLevel, value: value + newLine });
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

    /** adds an indent level */
    public indent(): void
    {
        this.#indentationLevel++;
    }

    /** Removes the current indent */
    public unindent(): void
    {
        this.#indentationLevel--;
        if (this.#indentationLevel < 0)
        {
            this.#indentationLevel = 0;
        }
    }

    /**
     * Returns a string representation of the StringBuilder.
     */
    public toString(): string
    {
        if (this.#invalidateLastValue)
        {
            this.#invalidateLastValue = false;
            return this.#lastValue = this.#strings
                .map(sv => [this.indentationString.repeat(sv.indent), sv.value])
                .reduce((p, c) => [p, ...c].join(empty), empty);
        }

        else
        {
            return this.#lastValue || empty;
        }
    }
}

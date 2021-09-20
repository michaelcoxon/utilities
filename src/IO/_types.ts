
export interface IStringBuilder
{
    /**
     * Append the value to the builder
     * @param value
     */
    append(value: string): void;

    /**
     * Appends the value to the builder with a new line afterwards.
     * @param value
     */
    appendLine(value: string): void;

    /**
     * Clears all values from the StringBuilder.
     */
    clear(): void;

    /**
     * Returns a string representation of the StringBuilder.
     */
    toString(): string;
}

export interface IIndentedStringBuilder 
{
    /**
     * Appends the value to the builder with a new line afterwards.
     * @param value
     */
    appendLine(value: string): void;

    /**
     * Clears all values from the StringBuilder.
     */
    clear(): void;

    /** adds an indent level */
    indent(): void;

    /**
     * Returns a string representation of the StringBuilder.
     */
    toString(): string;

    /** Removes the current indent */
    unindent(): void;
}
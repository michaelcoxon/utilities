"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Strings_1 = require("./Strings");
/**
 * Class for building strings that will only concatenate them upon calling toString().
 */
class StringBuilder {
    /**
     * Create a new StringBuilder.
     * @param value
     */
    constructor(...value) {
        if (value !== undefined) {
            this._strings = [...value];
        }
        else {
            this._strings = [];
        }
        this._invalidateLastValue = true;
    }
    /**
     * Append the value to the builder
     * @param value
     */
    append(value) {
        this._strings.push(value);
        this._invalidateLastValue = true;
    }
    /**
     * Appends the value to the builder with a new line afterwards.
     * @param value
     */
    appendLine(value) {
        this._strings.push(...[value, Strings_1.Strings.newLine]);
        this._invalidateLastValue = true;
    }
    /**
     * Clears all values from the StringBuilder.
     */
    clear() {
        this._strings.length = 0;
        this._invalidateLastValue = true;
    }
    /**
     * Returns a string representation of the StringBuilder.
     */
    toString() {
        if (this._invalidateLastValue) {
            this._invalidateLastValue = false;
            return this._lastValue = this._strings.join(Strings_1.Strings.empty);
        }
        else {
            return this._lastValue || Strings_1.Strings.empty;
        }
    }
}
exports.StringBuilder = StringBuilder;
/**
 * Class for building strings that will only concatenate them upon calling toString().
 */
class IndentedStringBuilder {
    /**
     * Create a new StringBuilder.
     * @param value
     */
    constructor(indentationLevel, ...value) {
        this.indentationString = "\t";
        this._indentationLevel = indentationLevel;
        if (value !== undefined) {
            this._strings = value.map(s => ({ indent: this._indentationLevel, value: s }));
        }
        else {
            this._strings = [];
        }
        this._invalidateLastValue = true;
    }
    /**
     * Appends the value to the builder with a new line afterwards.
     * @param value
     */
    appendLine(value) {
        this._strings.push({ indent: this._indentationLevel, value: value });
        this._invalidateLastValue = true;
    }
    /**
     * Clears all values from the StringBuilder.
     */
    clear() {
        this._strings.length = 0;
        this._invalidateLastValue = true;
    }
    /** adds an indent level */
    indent() {
        this._indentationLevel++;
    }
    /** Removes the current indent */
    unindent() {
        this._indentationLevel--;
        if (this._indentationLevel < 0) {
            this._indentationLevel = 0;
        }
    }
    /**
     * Returns a string representation of the StringBuilder.
     */
    toString() {
        if (this._invalidateLastValue) {
            this._invalidateLastValue = false;
            return this._lastValue = this._strings
                .map(sv => [this.indentationString.repeat(sv.indent), sv.value])
                .reduce((p, c) => [p, ...c].join(Strings_1.Strings.empty), Strings_1.Strings.empty);
        }
        else {
            return this._lastValue || Strings_1.Strings.empty;
        }
    }
}
exports.IndentedStringBuilder = IndentedStringBuilder;
//# sourceMappingURL=StringBuilder.js.map
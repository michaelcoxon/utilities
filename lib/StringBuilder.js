"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Strings = require("./String");
/**
 * Class for building strings that will only concatenate them upon calling toString().
 */
var StringBuilder = (function () {
    /**
     * Create a new StringBuilder.
     * @param value
     */
    function StringBuilder() {
        var value = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            value[_i] = arguments[_i];
        }
        if (value !== undefined) {
            this._strings = value.slice();
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
    StringBuilder.prototype.append = function (value) {
        this._strings.push(value);
        this._invalidateLastValue = true;
    };
    /**
     * Appends the value to the builder with a new line afterwards.
     * @param value
     */
    StringBuilder.prototype.appendLine = function (value) {
        (_a = this._strings).push.apply(_a, [value, Strings.newLine]);
        this._invalidateLastValue = true;
        var _a;
    };
    /**
     * Clears all values from the StringBuilder.
     */
    StringBuilder.prototype.clear = function () {
        this._strings.length = 0;
        this._invalidateLastValue = true;
    };
    /**
     * Returns a string representation of the StringBuilder.
     */
    StringBuilder.prototype.toString = function () {
        if (this._invalidateLastValue) {
            this._invalidateLastValue = false;
            return this._lastValue = this._strings.join(Strings.empty);
        }
        else {
            return this._lastValue || Strings.empty;
        }
    };
    return StringBuilder;
}());
exports.StringBuilder = StringBuilder;
//# sourceMappingURL=StringBuilder.js.map
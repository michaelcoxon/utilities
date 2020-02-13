"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("tslib");
/** Lazy value provider for promises */
class LazyAsync {
    /**
     * Creates a new instance of the LazyAsync
     * @param factory The factory that creates the promise to be resolved
     */
    constructor(factory) {
        this._factory = factory;
    }
    /** Returns the promise if it is already constructed or constructs the promise and returns it */
    get value() {
        if (this._value !== undefined) {
            return this._value;
        }
        else {
            return this._value = this._factory();
        }
    }
    /** Returns true if the promise has been created */
    get isValueCreated() {
        return this._value !== undefined;
    }
}
exports.LazyAsync = LazyAsync;
//# sourceMappingURL=LazyAsync.js.map
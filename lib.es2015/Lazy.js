"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lazy {
    constructor(factory) {
        this._factory = factory;
    }
    get value() {
        return this._value || (this._value = this._factory());
    }
    get isValueCreated() {
        return this._value !== undefined;
    }
}
exports.Lazy = Lazy;
//# sourceMappingURL=Lazy.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lazy = (function () {
    function Lazy(factory) {
        this._factory = factory;
    }
    Object.defineProperty(Lazy.prototype, "value", {
        get: function () {
            return this._value || (this._value = this._factory());
        },
        enumerable: true,
        configurable: true
    });
    return Lazy;
}());
exports.Lazy = Lazy;
//# sourceMappingURL=Lazy.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor(success, value, error, previousResult) {
        this._success = success;
        this._value = value;
        this._error = error;
        this._previousResult = previousResult;
    }
    get value() {
        return this._value;
    }
    get success() {
        return this._success;
    }
    get error() {
        return this._error;
    }
    get previousResult() {
        return this.previousResult;
    }
    static ok(value, previousResult) {
        return new Result(true, value, undefined, previousResult);
    }
    static fail(error, previousResult) {
        return new Result(false, undefined, error, previousResult);
    }
}
exports.Result = Result;
//# sourceMappingURL=Result.js.map
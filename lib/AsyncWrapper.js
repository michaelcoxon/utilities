"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The AsyncWrapper is provided to monitor the state of a promise.
 * You can use this to provide state feedback to the user of an awaitable
 * method.
 */
var AsyncWrapper = /** @class */ (function () {
    function AsyncWrapper(promiseOrValue, callback) {
        var _this = this;
        this._complete = false;
        this._success = false;
        this._promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(promiseOrValue !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.doWork(resolve, reject, promiseOrValue, callback)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    }
    Object.defineProperty(AsyncWrapper.prototype, "promise", {
        /** Return the internal promise that is waiting for the orginal one to complete */
        get: function () {
            return this._promise;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWrapper.prototype, "complete", {
        /** returns true when the promise is complete, even if it errored */
        get: function () {
            return this._complete;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWrapper.prototype, "success", {
        /** returns true if the promise completed successfully */
        get: function () {
            return this._success;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWrapper.prototype, "value", {
        /** returns the value of the promise */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsyncWrapper.prototype, "error", {
        /** returns the error if the promise failed */
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    AsyncWrapper.prototype.doWork = function (resolve, reject, promiseOrValue, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        _a = this;
                        return [4 /*yield*/, promiseOrValue];
                    case 1:
                        _a._value = _b.sent();
                        resolve(this);
                        this._success = true;
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _b.sent();
                        this._error = error_1;
                        reject(error_1);
                        this._success = false;
                        return [3 /*break*/, 4];
                    case 3:
                        this._complete = true;
                        if (callback !== undefined) {
                            callback(this);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AsyncWrapper;
}());
exports.AsyncWrapper = AsyncWrapper;
//# sourceMappingURL=AsyncWrapper.js.map
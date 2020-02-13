"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("tslib");
const SingleInvokeEvent_1 = require("./SingleInvokeEvent");
const TypeHelpers_1 = require("./TypeHelpers");
/**
 * The AsyncWrapper is provided to monitor the state of a promise.
 * You can use this to provide state feedback to the user of an awaitable
 * method.
 */
class AsyncWrapper {
    constructor(promiseOrValueOrFactory, callback) {
        this._complete = false;
        this._success = false;
        this._completeEvent = new SingleInvokeEvent_1.SingleInvokeEvent();
        this._callback = callback;
        this.update(promiseOrValueOrFactory);
    }
    update(promiseOrValueOrFactory) {
        if (promiseOrValueOrFactory !== undefined) {
            this._success = false;
            this._complete = false;
            if (TypeHelpers_1.isFunction(promiseOrValueOrFactory)) {
                this._promise = Promise.resolve(promiseOrValueOrFactory());
            }
            else {
                this._promise = Promise.resolve(promiseOrValueOrFactory);
            }
            new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let cancelled = false;
                const promise = this._promise;
                try {
                    const value = yield promise;
                    if (this._promise !== promise) {
                        cancelled = true;
                        return;
                    }
                    this._value = value;
                    resolve(this.value);
                    this._success = true;
                }
                catch (error) {
                    if (this._promise !== promise) {
                        cancelled = true;
                        return;
                    }
                    this._error = error;
                    reject(error);
                    this._success = false;
                }
                finally {
                    if (!cancelled) {
                        this._complete = true;
                        this._completeEvent.invoke(this, this._value);
                        if (this._callback !== undefined) {
                            this._callback(this);
                        }
                    }
                }
            }));
        }
    }
    /** Event to be fired when the internal promise has completed */
    get completeEvent() {
        return this._completeEvent;
    }
    /** Return the internal promise that is waiting for the orginal one to complete */
    get promise() {
        return this._promise;
    }
    /** returns true when the promise is complete, even if it errored */
    get complete() {
        return this._complete;
    }
    /** returns true if the promise completed successfully */
    get success() {
        return this._success;
    }
    /** returns the value of the promise */
    get value() {
        return this._value;
    }
    /** returns the error if the promise failed */
    get error() {
        return this._error;
    }
}
exports.AsyncWrapper = AsyncWrapper;
//# sourceMappingURL=AsyncWrapper.js.map
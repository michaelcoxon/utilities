"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const SingleInvokeEvent_1 = require("./SingleInvokeEvent");
class CancellablePromise {
    constructor(promise) {
        this._finallyEvent = new SingleInvokeEvent_1.SingleInvokeEvent();
        this._cancelled = false;
        this._watcherPromise = new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield promise;
                if (this._cancelled) {
                    return;
                }
                resolve(value);
            }
            catch (error) {
                if (this._cancelled) {
                    return;
                }
                reject(error);
            }
            finally {
                this._finallyEvent.invoke(this, {
                    promise: this._watcherPromise,
                    cancelled: this.cancelled
                });
            }
        }));
    }
    get cancelled() {
        return this._cancelled;
    }
    cancel() {
        this._cancelled = true;
        // as soon as wee call cancel finalise the promise
        this._finallyEvent.invoke(this, {
            promise: this._watcherPromise,
            cancelled: this.cancelled
        });
    }
    then(onfulfilled, onrejected) {
        let promise;
        if (this._cancelled) {
            promise = new Promise(() => { });
        }
        else {
            promise = this._watcherPromise.then(onfulfilled, onrejected);
        }
        const cancellable = new CancellablePromise(promise);
        this.finally((p, cancelled) => {
            if (cancelled) {
                cancellable.cancel();
            }
        });
        return cancellable;
    }
    catch(onrejected) {
        let promise;
        if (this._cancelled) {
            promise = new Promise(() => { });
        }
        else {
            promise = this._watcherPromise.catch(onrejected);
        }
        const cancellable = new CancellablePromise(promise);
        this.finally((p, cancelled) => {
            if (cancelled) {
                cancellable.cancel();
            }
        });
        return cancellable;
    }
    finally(onfinally) {
        if (onfinally) {
            this._finallyEvent.addHandler((s, e) => onfinally(e.promise, e.cancelled));
        }
        return this;
    }
}
exports.CancellablePromise = CancellablePromise;
//# sourceMappingURL=CancellablePromise.js.map
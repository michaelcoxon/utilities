"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Exceptions_1 = require("./Exceptions");
/** A Disposable that can collect disposable objects and dispose then when it is disposed */
class AggregateDisposable {
    constructor(...disposables) {
        this._disposed = false;
        this._disposables = disposables;
    }
    /** Disposes the objects tracked by this */
    dispose() {
        this._disposed = true;
        for (var disposable of this._disposables) {
            try {
                return disposable.dispose();
            }
            catch (ex) {
                if (!(ex instanceof Exceptions_1.AlreadyDisposedException)) {
                    if (ex instanceof Exceptions_1.Exception) {
                        throw new Exceptions_1.Exception("An error occured while disposing an object", ex);
                    }
                    else if (ex instanceof Error) {
                        throw new Exceptions_1.Exception("An error occured while disposing an object", new Exceptions_1.ErrorException(ex));
                    }
                    else {
                        throw new Exceptions_1.Exception(`An error occured while disposing an object: '${ex}'`);
                    }
                }
            }
        }
    }
    track(disposable) {
        if (this._disposed) {
            throw new Exceptions_1.AlreadyDisposedException();
        }
        this._disposables.push(disposable);
    }
    disposeAsync() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    for (var disposable of this._disposables) {
                        return disposable.dispose();
                    }
                    resolve();
                }
                catch (ex) {
                    reject(ex);
                }
            });
        });
    }
}
exports.AggregateDisposable = AggregateDisposable;
//# sourceMappingURL=AggregateDisposable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var Promises;
(function (Promises) {
    /**
     * Delays for the number of milliseconds
     * @param ms
     */
    function delay(ms) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                if (timeout) {
                    clearTimeout(timeout);
                }
                resolve();
            }, ms);
        });
    }
    Promises.delay = delay;
    /** Returns a new resolved Promise */
    function resolved() {
        return new Promise(resolve => resolve());
    }
    Promises.resolved = resolved;
    /** Returns a new rejected Promise */
    function rejected(reason) {
        return new Promise((resolve, reject) => reject(reason));
    }
    Promises.rejected = rejected;
    function ensure(promisable) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                resolve(yield promisable);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    Promises.ensure = ensure;
    function create(promisableFactory) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                resolve(yield promisableFactory());
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    Promises.create = create;
})(Promises = exports.Promises || (exports.Promises = {}));
//# sourceMappingURL=Promises.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * creates a disposable object then cleans it up after inner has finished execution. DO NOT USE ON PROMISES!!! use `usingAsync` instead.
 * @param disposableObjectFactory
 * @param inner
 */
function using(disposableObjectFactory, inner) {
    const disposableObject = disposableObjectFactory();
    try {
        return inner(disposableObject);
    }
    finally {
        disposableObject.dispose();
    }
}
exports.using = using;
/**
 * creates a disposable object then cleans it up after inner has resolved.
 * @param disposableObjectFactory
 * @param inner
 */
function usingAsync(disposableObjectFactory, inner) {
    return new Promise((resolve, reject) => {
        let disposableObject;
        try {
            const dO = disposableObject = disposableObjectFactory();
            inner(dO)
                .then(result => {
                dO.dispose();
                resolve(result);
            })
                .catch(error => {
                dO.dispose();
                reject(error);
            });
        }
        catch (error) {
            if (disposableObject) {
                disposableObject.dispose();
            }
            reject(error);
        }
    });
}
exports.usingAsync = usingAsync;
//# sourceMappingURL=IDisposable.js.map
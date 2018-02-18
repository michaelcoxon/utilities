"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function using(disposableObjectFactory, inner) {
    var disposableObject = disposableObjectFactory();
    try {
        return inner(disposableObject);
    }
    finally {
        disposableObject.dispose();
    }
}
exports.using = using;
//# sourceMappingURL=IDisposable.js.map
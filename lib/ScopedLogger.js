"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScopedLogger = /** @class */ (function () {
    function ScopedLogger(logger, name) {
        this._disposed = false;
        this._logger = logger;
        this._name = name;
    }
    ScopedLogger.prototype.debug = function (msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.debug(this.prepareMessage(msg));
    };
    ScopedLogger.prototype.debugError = function (err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.debugError(err, this.prepareMessage(msg));
    };
    ScopedLogger.prototype.error = function (msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.error(this.prepareMessage(msg));
    };
    ScopedLogger.prototype.errorError = function (err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.errorError(err, this.prepareMessage(msg));
    };
    ScopedLogger.prototype.info = function (msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.info(this.prepareMessage(msg));
    };
    ScopedLogger.prototype.infoError = function (err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.infoError(err, this.prepareMessage(msg));
    };
    ScopedLogger.prototype.trace = function (msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.trace(this.prepareMessage(msg));
    };
    ScopedLogger.prototype.traceError = function (err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.traceError(err, this.prepareMessage(msg));
    };
    ScopedLogger.prototype.warn = function (msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.warn(this.prepareMessage(msg));
    };
    ScopedLogger.prototype.warnError = function (err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.warnError(err, this.prepareMessage(msg));
    };
    ScopedLogger.prototype.scope = function (name) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        return new ScopedLogger(this, name);
    };
    ScopedLogger.prototype.prepareMessage = function (msg) {
        return "[" + this._name + "]" + (msg !== undefined ? ' ' : '') + (msg || null);
    };
    ScopedLogger.prototype.dispose = function () {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._disposed = true;
    };
    return ScopedLogger;
}());
exports.ScopedLogger = ScopedLogger;
//# sourceMappingURL=ScopedLogger.js.map
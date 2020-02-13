"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScopedLogger {
    constructor(logger, name) {
        this._disposed = false;
        this._logger = logger;
        this._name = name;
    }
    debug(msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.debug(this.prepareMessage(msg));
    }
    debugError(err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.debugError(err, this.prepareMessage(msg));
    }
    error(msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.error(this.prepareMessage(msg));
    }
    errorError(err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.errorError(err, this.prepareMessage(msg));
    }
    info(msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.info(this.prepareMessage(msg));
    }
    infoError(err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.infoError(err, this.prepareMessage(msg));
    }
    trace(msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.trace(this.prepareMessage(msg));
    }
    traceError(err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.traceError(err, this.prepareMessage(msg));
    }
    warn(msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.warn(this.prepareMessage(msg));
    }
    warnError(err, msg) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._logger.warnError(err, this.prepareMessage(msg));
    }
    scope(name) {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        return new ScopedLogger(this, name);
    }
    prepareMessage(msg) {
        return `[${this._name}]${msg !== undefined ? ' ' : ''}${msg || null}`;
    }
    dispose() {
        if (this._disposed) {
            throw new Error("Object is disposed");
        }
        this._disposed = true;
    }
}
exports.ScopedLogger = ScopedLogger;
//# sourceMappingURL=ScopedLogger.js.map
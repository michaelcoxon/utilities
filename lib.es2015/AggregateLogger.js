"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateDisposable_1 = require("./AggregateDisposable");
class AggregateLogger {
    constructor(...loggers) {
        this._loggers = loggers;
    }
    debug(msg) {
        for (const logger of this._loggers)
            logger.debug(msg);
    }
    debugError(err, msg) {
        for (const logger of this._loggers) {
            if (msg) {
                logger.debugError(err, msg);
            }
            else {
                logger.debugError(err);
            }
        }
    }
    error(msg) {
        for (const logger of this._loggers)
            logger.error(msg);
    }
    errorError(err, msg) {
        for (const logger of this._loggers) {
            if (msg) {
                logger.errorError(err, msg);
            }
            else {
                logger.errorError(err);
            }
        }
    }
    info(msg) {
        for (const logger of this._loggers)
            logger.info(msg);
    }
    infoError(err, msg) {
        for (const logger of this._loggers) {
            if (msg) {
                logger.infoError(err, msg);
            }
            else {
                logger.infoError(err);
            }
        }
    }
    trace(msg) {
        for (const logger of this._loggers)
            logger.trace(msg);
    }
    traceError(err, msg) {
        for (const logger of this._loggers) {
            if (msg) {
                logger.traceError(err, msg);
            }
            else {
                logger.traceError(err);
            }
        }
    }
    warn(msg) {
        for (const logger of this._loggers)
            logger.warn(msg);
    }
    warnError(err, msg) {
        for (const logger of this._loggers) {
            if (msg) {
                logger.warnError(err, msg);
            }
            else {
                logger.warnError(err);
            }
        }
    }
    scope(name) {
        const scopedLoggers = this._loggers.map(logger => logger.scope(name));
        const disposable = new AggregateDisposable_1.AggregateDisposable(...scopedLoggers);
        const aggLogger = new AggregateLogger(...scopedLoggers);
        return Object.assign(aggLogger, disposable);
    }
}
exports.AggregateLogger = AggregateLogger;
//# sourceMappingURL=AggregateLogger.js.map
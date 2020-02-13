"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noop = (...args) => { };
let _defaultLogger;
_defaultLogger = {
    debug: noop,
    debugError: noop,
    error: noop,
    errorError: noop,
    info: noop,
    infoError: noop,
    trace: noop,
    traceError: noop,
    warn: noop,
    warnError: noop,
    scope: (name) => Object.assign({ dispose: noop }, _defaultLogger),
};
function getDefaultLogger() {
    return _defaultLogger;
}
exports.getDefaultLogger = getDefaultLogger;
function setDefaultLogger(logger) {
    _defaultLogger = logger;
}
exports.setDefaultLogger = setDefaultLogger;
/** The log level. Used for filtering and tagging logging events */
var LogLevel;
(function (LogLevel) {
    /** Debug. Should only be used for logging to help development */
    LogLevel["Debug"] = "DEBG";
    /** Error. Used to log out errors and exceptions */
    LogLevel["Error"] = "EROR";
    /** Informational. Used to provide runtime information */
    LogLevel["Info"] = "INFO";
    /** Trace. Used to log program flow */
    LogLevel["Trace"] = "TRCE";
    /** Warning. Used to log errors and exceptions that do not break the program but need to be klnown about */
    LogLevel["Warn"] = "WARN";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
/**
 * Returns true if the desired log level is valid for the currently configured logging verbosity
 * @param desiredLevel The log level you want to log at
 * @param loggingVerbosity The cut off for when logging should be hidden
 */
function testLogVerbosity(desiredLevel, loggingVerbosity) {
    const isError = desiredLevel === LogLevel.Error;
    const isWarn = desiredLevel === LogLevel.Warn;
    const isInfo = desiredLevel === LogLevel.Info;
    const isTrace = desiredLevel === LogLevel.Trace;
    const isDebug = desiredLevel === LogLevel.Debug;
    return loggingVerbosity === LogLevel.Error && isError
        || loggingVerbosity === LogLevel.Warn && (isError || isWarn)
        || loggingVerbosity === LogLevel.Info && (isError || isWarn || isInfo)
        || loggingVerbosity === LogLevel.Trace && (isError || isWarn || isInfo || isTrace)
        || loggingVerbosity === LogLevel.Debug && (isError || isWarn || isInfo || isTrace || isDebug);
}
exports.testLogVerbosity = testLogVerbosity;
/**
 * Decorator for setting the logger scope of an ILogger instance
 * @param name
 */
function loggerScope(name) {
    return (target, key) => {
        const logger = target[key];
        if (!logger) {
            throw "logger is no set yet";
        }
        target[key] = logger.scope(name);
    };
}
exports.loggerScope = loggerScope;
//# sourceMappingURL=ILogger.js.map
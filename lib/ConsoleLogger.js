"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ILogger_1 = require("./ILogger");
var ErrorHelper_1 = require("./ErrorHelper");
var ScopedLogger_1 = require("./ScopedLogger");
var defaultConfig = {
    loggingVerbosity: ILogger_1.LogLevel.Info,
    useTraceMethodForTraceLogLevel: false
};
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(console, config) {
        if (config === void 0) { config = defaultConfig; }
        this._config = config;
        this._logMethod = console.log;
        this._errorMethod = console.error || this._logMethod;
        this._infoMethod = console.info || this._logMethod;
        // sometimes the trace method is wayyyy too verbose....
        this._traceMethod = config.useTraceMethodForTraceLogLevel
            ? console.trace || this._logMethod
            : this._logMethod;
        this._warnMethod = console.warn || this._logMethod;
    }
    ConsoleLogger.prototype.debug = function (msg) {
        this.log(ILogger_1.LogLevel.Debug, msg);
    };
    ConsoleLogger.prototype.debugError = function (err, msg) {
        var error = ErrorHelper_1.ErrorHelper.errorToLogMessage(err);
        var message = msg !== undefined
            ? msg + "\n" + error
            : error;
        this.log(ILogger_1.LogLevel.Debug, message);
    };
    ConsoleLogger.prototype.error = function (msg) {
        this.log(ILogger_1.LogLevel.Error, msg);
    };
    ConsoleLogger.prototype.errorError = function (err, msg) {
        var error = ErrorHelper_1.ErrorHelper.errorToLogMessage(err);
        var message = msg !== undefined
            ? msg + "\n" + error
            : error;
        this.log(ILogger_1.LogLevel.Error, message);
    };
    ConsoleLogger.prototype.info = function (msg) {
        this.log(ILogger_1.LogLevel.Info, msg);
    };
    ConsoleLogger.prototype.infoError = function (err, msg) {
        var error = ErrorHelper_1.ErrorHelper.errorToLogMessage(err);
        var message = msg !== undefined
            ? msg + "\n" + error
            : error;
        this.log(ILogger_1.LogLevel.Info, message);
    };
    ConsoleLogger.prototype.trace = function (msg) {
        this.log(ILogger_1.LogLevel.Trace, msg);
    };
    ConsoleLogger.prototype.traceError = function (err, msg) {
        var error = ErrorHelper_1.ErrorHelper.errorToLogMessage(err);
        var message = msg !== undefined
            ? msg + "\n" + error
            : error;
        this.log(ILogger_1.LogLevel.Trace, message);
    };
    ConsoleLogger.prototype.warn = function (msg) {
        this.log(ILogger_1.LogLevel.Warn, msg);
    };
    ConsoleLogger.prototype.warnError = function (err, msg) {
        var error = ErrorHelper_1.ErrorHelper.errorToLogMessage(err);
        var message = msg !== undefined
            ? msg + "\n" + error
            : error;
        this.log(ILogger_1.LogLevel.Warn, message);
    };
    ConsoleLogger.prototype.scope = function (name) {
        return new ScopedLogger_1.ScopedLogger(this, name);
    };
    ConsoleLogger.prototype.log = function (level, msg) {
        var message = "[" + level + "] " + msg;
        switch (level) {
            case ILogger_1.LogLevel.Error:
                this._errorMethod(message);
                break;
            case ILogger_1.LogLevel.Warn:
                this._warnMethod(message);
                break;
            case ILogger_1.LogLevel.Info:
                this._infoMethod(message);
                break;
            case ILogger_1.LogLevel.Trace:
                this._traceMethod(message);
                break;
            case ILogger_1.LogLevel.Debug:
            default:
                this._logMethod(message);
                break;
        }
    };
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map
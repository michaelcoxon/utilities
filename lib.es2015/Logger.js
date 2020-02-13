"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ILogger_1 = require("./ILogger");
const ErrorHelper_1 = require("./ErrorHelper");
const ScopedLogger_1 = require("./ScopedLogger");
const StringBuilder_1 = require("./StringBuilder");
const defaultConfig = {
    loggingVerbosity: ILogger_1.LogLevel.Info,
};
class Logger {
    constructor(config = defaultConfig) {
        this._config = config;
    }
    debug(msg) {
        this.log(ILogger_1.LogLevel.Debug, new StringBuilder_1.IndentedStringBuilder(0, msg));
    }
    debugError(err, msg) {
        const sb = new StringBuilder_1.IndentedStringBuilder(0);
        if (msg !== undefined) {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper_1.ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else {
            ErrorHelper_1.ErrorHelper.errorToLogMessage(err, sb);
        }
        this.log(ILogger_1.LogLevel.Debug, sb);
    }
    error(msg) {
        this.log(ILogger_1.LogLevel.Error, new StringBuilder_1.IndentedStringBuilder(0, msg));
    }
    errorError(err, msg) {
        const sb = new StringBuilder_1.IndentedStringBuilder(0);
        if (msg !== undefined) {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper_1.ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else {
            ErrorHelper_1.ErrorHelper.errorToLogMessage(err, sb);
        }
        this.log(ILogger_1.LogLevel.Error, sb);
    }
    info(msg) {
        this.log(ILogger_1.LogLevel.Info, new StringBuilder_1.IndentedStringBuilder(0, msg));
    }
    infoError(err, msg) {
        const sb = new StringBuilder_1.IndentedStringBuilder(0);
        if (msg !== undefined) {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper_1.ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else {
            ErrorHelper_1.ErrorHelper.errorToLogMessage(err, sb);
        }
        this.log(ILogger_1.LogLevel.Info, sb);
    }
    trace(msg) {
        this.log(ILogger_1.LogLevel.Trace, new StringBuilder_1.IndentedStringBuilder(0, msg));
    }
    traceError(err, msg) {
        const sb = new StringBuilder_1.IndentedStringBuilder(0);
        if (msg !== undefined) {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper_1.ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else {
            ErrorHelper_1.ErrorHelper.errorToLogMessage(err, sb);
        }
        this.log(ILogger_1.LogLevel.Trace, sb);
    }
    warn(msg) {
        this.log(ILogger_1.LogLevel.Warn, new StringBuilder_1.IndentedStringBuilder(0, msg));
    }
    warnError(err, msg) {
        const sb = new StringBuilder_1.IndentedStringBuilder(0);
        if (msg !== undefined) {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper_1.ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else {
            ErrorHelper_1.ErrorHelper.errorToLogMessage(err, sb);
        }
        this.log(ILogger_1.LogLevel.Warn, sb);
    }
    scope(name) {
        return new ScopedLogger_1.ScopedLogger(this, name);
    }
    log(level, sb) {
        if (ILogger_1.testLogVerbosity(level, this._config.loggingVerbosity)) {
            const message = `[${level}] ${sb.toString()}`;
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
                    this._debugMethod(message);
                    break;
                default:
                    this._defaultMethod(message);
                    break;
            }
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ILogger_1 = require("./ILogger");
const Logger_1 = require("./Logger");
const defaultConfig = {
    loggingVerbosity: ILogger_1.LogLevel.Info,
    useTraceMethodForTraceLogLevel: false
};
class ConsoleLogger extends Logger_1.Logger {
    constructor(console, config = defaultConfig) {
        super(config);
        this._consoleLoggerConfig = config;
        this._debugMethod = console.log.bind(console);
        this._defaultMethod = console.log.bind(console);
        this._errorMethod = (console.error || console.log).bind(console);
        this._infoMethod = (console.info || console.log).bind(console);
        // sometimes the trace method is wayyyy too verbose....
        this._traceMethod = this._consoleLoggerConfig.useTraceMethodForTraceLogLevel
            ? (console.trace || console.log).bind(console)
            : this._defaultMethod;
        this._warnMethod = (console.warn || console.log).bind(console);
    }
    _errorMethod(message) {
        throw new Error("Method not implemented.");
    }
    _warnMethod(message) {
        throw new Error("Method not implemented.");
    }
    _infoMethod(message) {
        throw new Error("Method not implemented.");
    }
    _traceMethod(message) {
        throw new Error("Method not implemented.");
    }
    _debugMethod(message) {
        throw new Error("Method not implemented.");
    }
    _defaultMethod(message) {
        throw new Error("Method not implemented.");
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map
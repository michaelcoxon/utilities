import { ILogger, LogLevel } from './ILogger';
import { IDisposable } from './IDisposable';
import { ErrorHelper } from "./ErrorHelper";
import { ScopedLogger } from "./ScopedLogger";

const defaultConfig: IConsoleLoggerConfig = {
    loggingVerbosity: LogLevel.Info,
    useTraceMethodForTraceLogLevel: false
};

export interface IConsoleLoggerConfig
{
    /** the logging verbosity to filter on */
    loggingVerbosity: LogLevel;
    /** some browsers support the 'console.trace' method. this method gives out more info on trace logs. */
    useTraceMethodForTraceLogLevel: boolean;
}

export interface IConsole
{
    log: (message?: any, ...optionalParams: any[]) => void;

    warn?: (message?: any, ...optionalParams: any[]) => void;
    trace?: (message?: any, ...optionalParams: any[]) => void;
    info?: (message?: any, ...optionalParams: any[]) => void;
    error?: (message?: any, ...optionalParams: any[]) => void;
}

export class ConsoleLogger implements ILogger
{
    private readonly _config: IConsoleLoggerConfig

    private readonly _warnMethod: (message?: any, ...optionalParams: any[]) => void;
    private readonly _traceMethod: (message?: any, ...optionalParams: any[]) => void;
    private readonly _infoMethod: (message?: any, ...optionalParams: any[]) => void;
    private readonly _errorMethod: (message?: any, ...optionalParams: any[]) => void;
    private readonly _logMethod: (message?: any, ...optionalParams: any[]) => void;

    constructor(console: IConsole, config: IConsoleLoggerConfig = defaultConfig)
    {
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

    debug(msg: string): void
    {
        this.log(LogLevel.Debug, msg);
    }

    debugError(err: Error): void;
    debugError(err: Error, msg: string): void
    debugError(err: Error, msg?: string): void
    {
        const error = ErrorHelper.errorToLogMessage(err);
        const message = msg !== undefined
            ? `${msg}\n${error}`
            : error;
        this.log(LogLevel.Debug, message);
    }

    error(msg: string): void
    {
        this.log(LogLevel.Error, msg);
    }

    errorError(err: Error): void;
    errorError(err: Error, msg: string): void;
    errorError(err: Error, msg?: string): void
    {
        const error = ErrorHelper.errorToLogMessage(err);
        const message = msg !== undefined
            ? `${msg}\n${error}`
            : error;
        this.log(LogLevel.Error, message);
    }

    info(msg: string): void
    {
        this.log(LogLevel.Info, msg);
    }

    infoError(err: Error): void;
    infoError(err: Error, msg: string): void;
    infoError(err: Error, msg?: string): void
    {
        const error = ErrorHelper.errorToLogMessage(err);
        const message = msg !== undefined
            ? `${msg}\n${error}`
            : error;
        this.log(LogLevel.Info, message);
    }

    trace(msg: string): void
    {
        this.log(LogLevel.Trace, msg);
    }

    traceError(err: Error): void;
    traceError(err: Error, msg: string): void;
    traceError(err: Error, msg?: string): void
    {
        const error = ErrorHelper.errorToLogMessage(err);
        const message = msg !== undefined
            ? `${msg}\n${error}`
            : error;
        this.log(LogLevel.Trace, message);
    }

    warn(msg: string): void
    {
        this.log(LogLevel.Warn, msg);
    }

    warnError(err: Error): void;
    warnError(err: Error, msg: string): void;
    warnError(err: Error, msg?: string): void
    {
        const error = ErrorHelper.errorToLogMessage(err);
        const message = msg !== undefined
            ? `${msg}\n${error}`
            : error;
        this.log(LogLevel.Warn, message);
    }

    scope(name: string): ILogger & IDisposable
    {
        return new ScopedLogger(this, name);
    }

    private log(level: LogLevel, msg: string): void
    {
        const message = `[${level}] ${msg}`;

        switch (level)
        {
            case LogLevel.Error:
                this._errorMethod(message);
                break;

            case LogLevel.Warn:
                this._warnMethod(message);
                break;

            case LogLevel.Info:
                this._infoMethod(message);
                break;

            case LogLevel.Trace:
                this._traceMethod(message);
                break;

            case LogLevel.Debug:
            default:
                this._logMethod(message);
                break;
        }
    }
}
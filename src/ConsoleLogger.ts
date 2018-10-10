import { ILogger, LogLevel, testLogVerbosity } from './ILogger';
import { IDisposable } from './IDisposable';
import { ErrorHelper } from "./ErrorHelper";
import { ScopedLogger } from "./ScopedLogger";
import { IndentedStringBuilder } from './StringBuilder';
import { Logger, ILoggerConfig } from './Logger';

const defaultConfig: IConsoleLoggerConfig = {
    loggingVerbosity: LogLevel.Info,
    useTraceMethodForTraceLogLevel: false
};

export interface IConsoleLoggerConfig extends ILoggerConfig
{
    /** the logging verbosity to filter on */
    loggingVerbosity: LogLevel;
    /** some browsers support the 'console.trace' method. this method gives out more info on trace logs. */
    useTraceMethodForTraceLogLevel: boolean;
}

export interface IConsole
{
    log: (message?: any, ...optionalParams: any[]) => void;

    // these are optional as tey are only supported by some console implementations
    warn?: (message?: any, ...optionalParams: any[]) => void;
    trace?: (message?: any, ...optionalParams: any[]) => void;
    info?: (message?: any, ...optionalParams: any[]) => void;
    error?: (message?: any, ...optionalParams: any[]) => void;
}

export class ConsoleLogger extends Logger implements ILogger
{
    private readonly _consoleLoggerConfig: IConsoleLoggerConfig

    constructor(console: IConsole, config: IConsoleLoggerConfig = defaultConfig)
    {
        super(config)
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

    protected _errorMethod(message: string): void
    {
        throw new Error("Method not implemented.");
    }
    protected _warnMethod(message: string): void
    {
        throw new Error("Method not implemented.");
    }
    protected _infoMethod(message: string): void
    {
        throw new Error("Method not implemented.");
    }
    protected _traceMethod(message: string): void
    {
        throw new Error("Method not implemented.");
    }
    protected _debugMethod(message: string): void
    {
        throw new Error("Method not implemented.");
    }
    protected _defaultMethod(message: string): void
    {
        throw new Error("Method not implemented.");
    }
}
import { IDisposable } from "../IDisposable";
import Utilities from "../Utilities";

let _defaultLogger: ILogger;

_defaultLogger = {
    debug: Utilities.noop,
    debugError: Utilities.noop,
    error: Utilities.noop,
    errorError: Utilities.noop,
    info: Utilities.noop,
    infoError: Utilities.noop,
    trace: Utilities.noop,
    traceError: Utilities.noop,
    warn: Utilities.noop,
    warnError: Utilities.noop,
    scope: (name) => Object.assign({ dispose: Utilities.noop }, _defaultLogger),
};


export function getDefaultLogger(): ILogger
{
    return _defaultLogger;
}

export function setDefaultLogger(logger: ILogger): void
{
    _defaultLogger = logger;
}

/** The log level. Used for filtering and tagging logging events */
export enum LogLevel
{
    /** Debug. Should only be used for logging to help development */
    Debug = "DEBG",
    /** Error. Used to log out errors and exceptions */
    Error = "EROR",
    /** Informational. Used to provide runtime information */
    Info = "INFO",
    /** Trace. Used to log program flow */
    Trace = "TRCE",
    /** Warning. Used to log errors and exceptions that do not break the program but need to be klnown about */
    Warn = "WARN",
}
/**
 * Returns true if the desired log level is valid for the currently configured logging verbosity
 * @param desiredLevel The log level you want to log at
 * @param loggingVerbosity The cut off for when logging should be hidden
 */
export function testLogVerbosity(desiredLevel: LogLevel, loggingVerbosity: LogLevel): boolean
{
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

/**
 * Decorator for setting the logger scope of an ILogger instance
 * @param name
 */
export function loggerScope(name: string): (target: any, key: string) => void
{
    return (target: any, key: string) =>
    {
        const logger = target[key] as ILogger;
        if (!logger)
        {
            throw "logger is no set yet";
        }
        target[key] = logger.scope(name);
    };
}

/** ILogger interface for all logging implementations */
export interface ILogger
{
    /**
     * Log a message flagged at the Debug log level
     * @param msg
     */
    debug(msg: string): void;
    /**
     * Log an error flagged at the Debug log level
     * @param err
     */
    debugError(err: Error): void;
    /**
     * Log an error and a message flagged at the Debug log level
     * @param err
     */
    debugError(err: Error, msg: string): void;

    /**
    * Log a message flagged at the Error log level
    * @param msg
    */
    error(msg: string): void;
    /**
     * Log an error flagged at the Error log level
     * @param err
     */
    errorError(err: Error): void;
    /**
     * Log an error and a message flagged at the Error log level
     * @param err
     */
    errorError(err: Error, msg: string): void;

    /**
    * Log a message flagged at the Informational log level
    * @param msg
    */
    info(msg: string): void;
    /**
     * Log an error flagged at the Informational log level
     * @param err
     */
    infoError(err: Error): void;
    /**
     * Log an error and a message flagged at the Informational log level
     * @param err
     */
    infoError(err: Error, msg: string): void;

    /**
    * Log a message flagged at the Trace log level
    * @param msg
    */
    trace(msg: string): void;
    /**
     * Log an error flagged at the Trace log level
     * @param err
     */
    traceError(err: Error): void;
    /**
     * Log an error and a message flagged at the Trace log level
     * @param err
     */
    traceError(err: Error, msg: string): void;

    /**
    * Log a message flagged at the Warning log level
    * @param msg
    */
    warn(msg: string): void;
    /**
     * Log an error flagged at the Warning log level
     * @param err
     */
    warnError(err: Error): void;
    /**
     * Log an error and a message flagged at the Warning log level
     * @param err
     */
    warnError(err: Error, msg: string): void;

    /**
     * Rescope the logger with the provided name. Used for tagging the logger.
     * @param name The tag the logger should be given
     * @example
     * Use the scope tool inside a 'using' to scope logging to a specific method.
     * return using(() => logger.scope("theNameOfMyScope"), logger =>
     *  {
     *      logger.debug("Log something here");
     *  });
     */
    scope(name: string): ILogger & IDisposable;
}



export interface ILoggerConfig
{
    /** the logging verbosity to filter on */
    loggingVerbosity: LogLevel;
}


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

    // these are optional as they are only supported by some console implementations
    warn?: (message?: any, ...optionalParams: any[]) => void;
    trace?: (message?: any, ...optionalParams: any[]) => void;
    info?: (message?: any, ...optionalParams: any[]) => void;
    error?: (message?: any, ...optionalParams: any[]) => void;
}
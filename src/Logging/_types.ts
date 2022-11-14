import { IDisposable } from '../Types.js';

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
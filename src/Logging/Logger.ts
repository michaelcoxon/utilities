import { ILogger, ILoggerConfig, LogLevel } from './_types';
import testLogVerbosity from "./utils/testLogVerbosity";
import ScopedLogger from "./ScopedLogger";
import { IDisposable } from '../Types';
import errorAndMessageToString from './utils/errorAndMessageToString';

const defaultConfig: ILoggerConfig = {
    loggingVerbosity: LogLevel.Info,
};

export default abstract class Logger implements ILogger
{
    static openLevel = '[';
    static closeLevel = ']';

    readonly #config: ILoggerConfig;

    constructor(config: ILoggerConfig = defaultConfig)
    {
        this.#config = config;
    }

    public debug(msg: string, ...args: unknown[]): void
    {
        this.log(LogLevel.Debug, msg, ...args);
    }

    public debugError(err: Error, msg?: string, ...args: unknown[]): void
    {
        this.log(LogLevel.Debug, errorAndMessageToString(msg, err), err, ...args);
    }

    public error(msg: string, ...args: unknown[]): void
    {
        this.log(LogLevel.Error, msg, ...args);
    }

    public errorError(err: Error, msg?: string, ...args: unknown[]): void
    {
        this.log(LogLevel.Error, errorAndMessageToString(msg, err), err, ...args);
    }

    public info(msg: string, ...args: unknown[]): void
    {
        this.log(LogLevel.Info, msg, ...args);
    }

    public infoError(err: Error, msg?: string, ...args: unknown[]): void
    {
        this.log(LogLevel.Info, errorAndMessageToString(msg, err), err, ...args);
    }

    public trace(msg: string, ...args: unknown[]): void
    {
        this.log(LogLevel.Trace, msg, ...args);
    }

    public traceError(err: Error, msg?: string, ...args: unknown[]): void
    {
        this.log(LogLevel.Trace, errorAndMessageToString(msg, err), err, ...args);
    }

    public warn(msg: string, ...args: unknown[]): void
    {
        this.log(LogLevel.Warn, msg, ...args);
    }

    public warnError(err: Error, msg?: string, ...args: unknown[]): void
    {
        this.log(LogLevel.Warn, errorAndMessageToString(msg, err), err, ...args);
    }

    public scope(name: string): ILogger & IDisposable
    {
        return new ScopedLogger(this, name);
    }

    /**
     * Calls the implementation of the logging level
     * @param level 
     * @param msg 
     * @param args extra objects/values to include with the log message
     */
    private log(level: LogLevel, msg: string, ...args: unknown[]): void
    {
        if (testLogVerbosity(level, this.#config.loggingVerbosity))
        {
            const message = `${Logger.openLevel}${level}${Logger.closeLevel} ${msg}`;

            switch (level)
            {
                case LogLevel.Error:
                    this._errorMethod(message, ...args);
                    break;

                case LogLevel.Warn:
                    this._warnMethod(message, ...args);
                    break;

                case LogLevel.Info:
                    this._infoMethod(message, ...args);
                    break;

                case LogLevel.Trace:
                    this._traceMethod(message, ...args);
                    break;

                case LogLevel.Debug:
                    this._debugMethod(message, ...args);
                    break;

                default:
                    this._defaultMethod(message, ...args);
                    break;
            }
        }
    }

    /**
     * Implementation for a Log message flagged at the Error log level
     * @param msg
     * @param args extra objects/values to include with the log message
     */
    protected abstract _errorMethod(message: string, ...args: unknown[]): void;
    /**
     * Implementation for a Log message flagged at the Warning log level
     * @param msg
     * @param args extra objects/values to include with the log message
     */
    protected abstract _warnMethod(message: string, ...args: unknown[]): void;
    /**
     * Implementation for a Log message flagged at the Informational log level
     * @param msg
     * @param args extra objects/values to include with the log message
     */
    protected abstract _infoMethod(message: string, ...args: unknown[]): void;
    /**
     * Implementation for a Log message flagged at the Trace log level
     * @param msg
     * @param args extra objects/values to include with the log message
     */
    protected abstract _traceMethod(message: string, ...args: unknown[]): void;
    /**
     * Implementation for a Log message flagged at the Debug log level
     * @param msg
     * @param args extra objects/values to include with the log message
     */
    protected abstract _debugMethod(message: string, ...args: unknown[]): void;
    /**
     * Implementation for a Log message not flagged
     * @param msg
     * @param args extra objects/values to include with the log message
     */
    protected abstract _defaultMethod(message: string, ...args: unknown[]): void;
}
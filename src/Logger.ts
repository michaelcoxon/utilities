import { ILogger, LogLevel, testLogVerbosity } from './ILogger';
import { IDisposable } from './IDisposable';
import ErrorHelper from "./ErrorHelper";
import ScopedLogger from "./ScopedLogger";
import IndentedStringBuilder from "./IndentedStringBuilder";

const defaultConfig: ILoggerConfig = {
    loggingVerbosity: LogLevel.Info,
};


export interface ILoggerConfig
{
    /** the logging verbosity to filter on */
    loggingVerbosity: LogLevel;
}

export default abstract class Logger implements ILogger
{
    private readonly _config: ILoggerConfig

    constructor(config: ILoggerConfig = defaultConfig)
    {
        this._config = config;
    }

    public debug(msg: string): void
    {
        this.log(LogLevel.Debug, new IndentedStringBuilder(0, msg));
    }

    public debugError(err: Error): void;
    public debugError(err: Error, msg: string): void
    public debugError(err: Error, msg?: string): void
    {
        const sb = new IndentedStringBuilder(0);
        if (msg !== undefined)
        {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            ErrorHelper.errorToLogMessage(err, sb);
        }
        this.log(LogLevel.Debug, sb);
    }

    public error(msg: string): void
    {
        this.log(LogLevel.Error, new IndentedStringBuilder(0, msg));
    }

    public errorError(err: Error): void;
    public errorError(err: Error, msg: string): void;
    public errorError(err: Error, msg?: string): void
    {
        const sb = new IndentedStringBuilder(0);
        if (msg !== undefined)
        {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            ErrorHelper.errorToLogMessage(err, sb);
        }
        this.log(LogLevel.Error, sb);
    }

    public info(msg: string): void
    {
        this.log(LogLevel.Info, new IndentedStringBuilder(0, msg));
    }

    public infoError(err: Error): void;
    public infoError(err: Error, msg: string): void;
    public infoError(err: Error, msg?: string): void
    {
        const sb = new IndentedStringBuilder(0);
        if (msg !== undefined)
        {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            ErrorHelper.errorToLogMessage(err, sb);
        }
        this.log(LogLevel.Info, sb);
    }

    public trace(msg: string): void
    {
        this.log(LogLevel.Trace, new IndentedStringBuilder(0, msg));
    }

    public traceError(err: Error): void;
    public traceError(err: Error, msg: string): void;
    public traceError(err: Error, msg?: string): void
    {
        const sb = new IndentedStringBuilder(0);
        if (msg !== undefined)
        {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            ErrorHelper.errorToLogMessage(err, sb);
        }
        this.log(LogLevel.Trace, sb);
    }

    public warn(msg: string): void
    {
        this.log(LogLevel.Warn, new IndentedStringBuilder(0, msg));
    }

    public warnError(err: Error): void;
    public warnError(err: Error, msg: string): void;
    public warnError(err: Error, msg?: string): void
    {
        const sb = new IndentedStringBuilder(0);
        if (msg !== undefined)
        {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            ErrorHelper.errorToLogMessage(err, sb);
        }
        this.log(LogLevel.Warn, sb);
    }

    public scope(name: string): ILogger & IDisposable
    {
        return new ScopedLogger(this, name);
    }

    private log(level: LogLevel, sb: IndentedStringBuilder): void
    {
        if (testLogVerbosity(level, this._config.loggingVerbosity))
        {
            const message = `[${level}] ${sb.toString()}`;

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
                    this._debugMethod(message);
                    break;

                default:
                    this._defaultMethod(message);
                    break;
            }
        }
    }

    protected abstract _errorMethod(message: string): void;
    protected abstract _warnMethod(message: string): void;
    protected abstract _infoMethod(message: string): void;
    protected abstract _traceMethod(message: string): void;
    protected abstract _debugMethod(message: string): void;
    protected abstract _defaultMethod(message: string): void;
}
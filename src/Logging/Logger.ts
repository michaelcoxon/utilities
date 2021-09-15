import { ILogger, ILoggerConfig, LogLevel } from './_types';
import testLogVerbosity from "./testLogVerbosity";
import { IDisposable } from '../IDisposable';
import ScopedLogger from "./ScopedLogger";
import IndentedStringBuilder from "../IO/IndentedStringBuilder";
import errorToLogMessage from '../errorToLogMessage';

const defaultConfig: ILoggerConfig = {
    loggingVerbosity: LogLevel.Info,
};

export default abstract class Logger implements ILogger
{
    readonly #config: ILoggerConfig

    constructor(config: ILoggerConfig = defaultConfig)
    {
        this.#config = config;
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
            errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            errorToLogMessage(err, sb);
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
            errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            errorToLogMessage(err, sb);
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
            errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            errorToLogMessage(err, sb);
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
            errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            errorToLogMessage(err, sb);
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
            errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            errorToLogMessage(err, sb);
        }
        this.log(LogLevel.Warn, sb);
    }

    public scope(name: string): ILogger & IDisposable
    {
        return new ScopedLogger(this, name);
    }

    private log(level: LogLevel, sb: IndentedStringBuilder): void
    {
        if (testLogVerbosity(level, this.#config.loggingVerbosity))
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
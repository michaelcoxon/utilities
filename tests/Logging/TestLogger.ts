import { IDisposable, IndentedStringBuilder, errorToLogMessage, ILogger, LogLevel, ScopedLogger } from '../../src';



export class TestLogger implements ILogger
{
    readonly #logCallback: (level: LogLevel, sb: IndentedStringBuilder) => void;

    constructor(logCallback: (level: LogLevel, sb: IndentedStringBuilder) => void)
    {
        this.#logCallback = logCallback;
    }

    debug(msg: string): void
    {
        this.#logCallback(LogLevel.Debug, new IndentedStringBuilder(0, msg));
    }

    debugError(err: Error): void;
    debugError(err: Error, msg: string): void;
    debugError(err: Error, msg?: string): void
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
        this.#logCallback(LogLevel.Debug, sb);
    }

    error(msg: string): void
    {
        this.#logCallback(LogLevel.Error, new IndentedStringBuilder(0, msg));
    }

    errorError(err: Error): void;
    errorError(err: Error, msg: string): void;
    errorError(err: Error, msg?: string): void
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
        this.#logCallback(LogLevel.Error, sb);
    }

    info(msg: string): void
    {
        this.#logCallback(LogLevel.Info, new IndentedStringBuilder(0, msg));
    }

    infoError(err: Error): void;
    infoError(err: Error, msg: string): void;
    infoError(err: Error, msg?: string): void
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
        this.#logCallback(LogLevel.Info, sb);
    }

    trace(msg: string): void
    {
        this.#logCallback(LogLevel.Trace, new IndentedStringBuilder(0, msg));
    }

    traceError(err: Error): void;
    traceError(err: Error, msg: string): void;
    traceError(err: Error, msg?: string): void
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
        this.#logCallback(LogLevel.Trace, sb);
    }

    warn(msg: string): void
    {
        this.#logCallback(LogLevel.Warn, new IndentedStringBuilder(0, msg));
    }

    warnError(err: Error): void;
    warnError(err: Error, msg: string): void;
    warnError(err: Error, msg?: string): void
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
        this.#logCallback(LogLevel.Warn, sb);
    }

    scope(name: string): ILogger & IDisposable
    {
        return new ScopedLogger(this, name);
    }
}

import Logger from '../../src/Logging/Logger.js';
import { ILoggerConfig, LogLevel } from '../../src/Logging/_types.js';


export class TestLogger extends Logger
{
    readonly #logCallback: (level: LogLevel, msg: string) => void;

    constructor(logCallback: (level: LogLevel, msg: string) => void, config?: ILoggerConfig)
    {
        super(config || { loggingVerbosity: LogLevel.Debug });
        this.#logCallback = logCallback;
    }

    protected _defaultMethod(msg: string): void
    {
        this.#logCallback(LogLevel.Info, msg);
    }

    protected _debugMethod(msg: string): void
    {
        this.#logCallback(LogLevel.Debug, msg);
    }

    protected _errorMethod(msg: string): void
    {
        this.#logCallback(LogLevel.Error, msg);
    }

    protected _infoMethod(msg: string): void
    {
        this.#logCallback(LogLevel.Info, msg);
    }

    protected _traceMethod(msg: string): void
    {
        this.#logCallback(LogLevel.Trace, msg);
    }

    protected _warnMethod(msg: string): void
    {
        this.#logCallback(LogLevel.Warn, msg);
    }
}

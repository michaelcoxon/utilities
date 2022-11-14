import { ILogger, LogLevel, IConsoleLoggerConfig } from './_types.js';
import { IConsole } from "../IConsole.js";
import Logger from './Logger.js';
import NotImplementedException from '../Exceptions/NotImplementedException.js';

const defaultConfig: IConsoleLoggerConfig = {
    loggingVerbosity: LogLevel.Info,
    useTraceMethodForTraceLogLevel: false
};

export default class ConsoleLogger extends Logger implements ILogger
{
    readonly #consoleLoggerConfig: IConsoleLoggerConfig;

    constructor(console: IConsole, config: IConsoleLoggerConfig = defaultConfig)
    {
        super(config);
        this.#consoleLoggerConfig = config;

        this._debugMethod = console.log.bind(console);
        this._defaultMethod = console.log.bind(console);
        this._errorMethod = (console.error || console.log).bind(console);
        this._infoMethod = (console.info || console.log).bind(console);

        // sometimes the trace method is wayyyy too verbose....
        this._traceMethod = this.#consoleLoggerConfig.useTraceMethodForTraceLogLevel
            ? (console.trace || console.log).bind(console)
            : this._defaultMethod;

        this._warnMethod = (console.warn || console.log).bind(console);
    }

    protected _errorMethod(): void
    {
        throw new NotImplementedException();
    }
    protected _warnMethod(): void
    {
        throw new NotImplementedException();
    }
    protected _infoMethod(): void
    {
        throw new NotImplementedException();
    }
    protected _traceMethod(): void
    {
        throw new NotImplementedException();
    }
    protected _debugMethod(): void
    {
        throw new NotImplementedException();
    }
    protected _defaultMethod(): void
    {
        throw new NotImplementedException();
    }
}
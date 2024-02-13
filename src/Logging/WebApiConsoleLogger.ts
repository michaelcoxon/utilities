import { ILogger, ILoggerConfig } from './_types';
import Logger from './Logger';

export default class WebApiConsoleLogger extends Logger implements ILogger
{
    readonly #console: Console;

    constructor(console: Console, config?: ILoggerConfig)
    {
        super(config);
        this.#console = console;
    }
   
    protected _debugMethod(message: string, ...args: unknown[]): void
    {
        return this.#console.debug(message, ...args);
    }
    protected _defaultMethod(message: string, ...args: unknown[]): void
    {
        return this.#console.log(message, ...args);
    }
    protected _errorMethod(message: string, ...args: unknown[]): void
    {
        return this.#console.error(message, ...args);
    }
    protected _infoMethod(message: string, ...args: unknown[]): void
    {
        return this.#console.info(message, ...args);
    }
    protected _traceMethod(message: string, ...args: unknown[]): void
    {
        return this.#console.trace(message, ...args);
    }
    protected _warnMethod(message: string, ...args: unknown[]): void
    {
        return this.#console.warn(message, ...args);
    }
}




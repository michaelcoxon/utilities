import { ILogger } from "./_types";
import AggregateDisposable from "../AggregateDisposable";
import { IDisposable } from '../Types';

export default class AggregateLogger implements ILogger
{
    readonly #loggers: ILogger[];

    constructor(...loggers: ILogger[])
    {
        this.#loggers = loggers;
    }


    debug(msg: string, ...args: unknown[]): void
    {
        for (const logger of this.#loggers) logger.debug(msg, ...args);
    }
    debugError(err: Error, msg?: string, ...args: unknown[])
    {
        for (const logger of this.#loggers)
        {
            if (msg)
            {
                logger.debugError(err, msg, ...args);
            }
            else
            {
                logger.debugError(err, ...args);
            }
        }
    }
    error(msg: string, ...args: unknown[]): void
    {
        for (const logger of this.#loggers) logger.error(msg, ...args);
    }
    errorError(err: Error, msg?: string, ...args: unknown[])
    {
        for (const logger of this.#loggers)
        {
            if (msg)
            {
                logger.errorError(err, msg, ...args);
            }
            else
            {
                logger.errorError(err, ...args);
            }
        }
    }
    info(msg: string, ...args: unknown[]): void
    {
        for (const logger of this.#loggers) logger.info(msg, ...args);
    }
    infoError(err: Error, msg?: string, ...args: unknown[])
    {
        for (const logger of this.#loggers)
        {
            if (msg)
            {
                logger.infoError(err, msg, ...args);
            }
            else
            {
                logger.infoError(err, ...args);
            }
        }
    }
    trace(msg: string, ...args: unknown[]): void
    {
        for (const logger of this.#loggers) logger.trace(msg, ...args);
    }
    traceError(err: Error, msg?: string, ...args: unknown[])
    {
        for (const logger of this.#loggers)
        {
            if (msg)
            {
                logger.traceError(err, msg, ...args);
            }
            else
            {
                logger.traceError(err, ...args);
            }
        }
    }
    warn(msg: string, ...args: unknown[]): void
    {
        for (const logger of this.#loggers) logger.warn(msg, ...args);
    }
    warnError(err: Error, msg?: string, ...args: unknown[])
    {
        for (const logger of this.#loggers)
        {
            if (msg)
            {
                logger.warnError(err, msg, ...args);
            }
            else
            {
                logger.warnError(err, ...args);
            }
        }
    }
    scope(name: string): ILogger & IDisposable
    {
        const scopedLoggers = this.#loggers.map(logger => logger.scope(name));
        const disposable = new AggregateDisposable(...scopedLoggers);
        const aggLogger = new AggregateLogger(...scopedLoggers);

        return Object.assign(aggLogger, disposable);
    }
}

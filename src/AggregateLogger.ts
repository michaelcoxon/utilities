import { ILogger } from ".";
import { IDisposable } from "src/IDisposable";
import { AggregateDisposable } from "./AggregateDisposable";





export class AggregateLogger implements ILogger
{
    private readonly _loggers: ILogger[];

    constructor(...loggers: ILogger[])
    {
        this._loggers = loggers;
    }


    debug(msg: string): void
    {
        for (const logger of this._loggers) logger.debug(msg);
    }
    debugError(err: Error): void;
    debugError(err: Error, msg: string): void;
    debugError(err: Error, msg?: string)
    {
        for (const logger of this._loggers)
        {
            if (msg)
            {
                logger.debugError(err, msg);
            }
            else
            {
                logger.debugError(err);
            }
        }
    }
    error(msg: string): void
    {
        for (const logger of this._loggers) logger.error(msg);
    }
    errorError(err: Error): void;
    errorError(err: Error, msg: string): void;
    errorError(err: Error, msg?: string)
    {
        for (const logger of this._loggers)
        {
            if (msg)
            {
                logger.errorError(err, msg);
            }
            else
            {
                logger.errorError(err);
            }
        }
    }
    info(msg: string): void
    {
        for (const logger of this._loggers) logger.info(msg);
    }
    infoError(err: Error): void;
    infoError(err: Error, msg: string): void;
    infoError(err: Error, msg?: string)
    {
        for (const logger of this._loggers)
        {
            if (msg)
            {
                logger.infoError(err, msg);
            }
            else
            {
                logger.infoError(err);
            }
        }
    }
    trace(msg: string): void
    {
        for (const logger of this._loggers) logger.trace(msg);
    }
    traceError(err: Error): void;
    traceError(err: Error, msg: string): void;
    traceError(err: Error, msg?: string)
    {
        for (const logger of this._loggers)
        {
            if (msg)
            {
                logger.traceError(err, msg);
            }
            else
            {
                logger.traceError(err);
            }
        }
    }
    warn(msg: string): void
    {
        for (const logger of this._loggers) logger.warn(msg);
    }
    warnError(err: Error): void;
    warnError(err: Error, msg: string): void;
    warnError(err: Error, msg?: string)
    {
        for (const logger of this._loggers)
        {
            if (msg)
            {
                logger.warnError(err, msg);
            }
            else
            {
                logger.warnError(err);
            }
        }
    }
    scope(name: string): ILogger & IDisposable
    {
        const scopedLoggers = this._loggers.map(logger => logger.scope(name));
        const disposable = new AggregateDisposable(...scopedLoggers);
        const aggLogger = new AggregateLogger(...scopedLoggers);

        return Object.assign({}, aggLogger, disposable);
    }
}

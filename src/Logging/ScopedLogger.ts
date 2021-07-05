import { ILogger } from "./_types";
import { IDisposable } from "../IDisposable";

export default class ScopedLogger implements ILogger, IDisposable
{
    private readonly _name: string;
    private readonly _logger: ILogger;

    private _disposed: boolean = false;

    constructor(logger: ILogger, name: string)
    {
        this._logger = logger;
        this._name = name;
    }

    debug(msg: string): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._logger.debug(this.prepareMessage(msg));
    }

    debugError(err: Error): void;
    debugError(err: Error, msg: string): void;
    debugError(err: Error, msg?: string): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._logger.debugError(err, this.prepareMessage(msg));
    }

    error(msg: string): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._logger.error(this.prepareMessage(msg));
    }

    errorError(err: Error): void;
    errorError(err: Error, msg: string): void;
    errorError(err: Error, msg?: string): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._logger.errorError(err, this.prepareMessage(msg));
    }

    info(msg: string): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._logger.info(this.prepareMessage(msg));
    }

    infoError(err: Error): void;
    infoError(err: Error, msg: string): void
    infoError(err: Error, msg?: string): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._logger.infoError(err, this.prepareMessage(msg));
    }

    trace(msg: string): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._logger.trace(this.prepareMessage(msg));
    }

    traceError(err: Error): void;
    traceError(err: Error, msg: string): void
    traceError(err: Error, msg?: string): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._logger.traceError(err, this.prepareMessage(msg));
    }

    warn(msg: string): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._logger.warn(this.prepareMessage(msg));
    }

    warnError(err: Error): void;
    warnError(err: Error, msg: string): void
    warnError(err: Error, msg?: string): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._logger.warnError(err, this.prepareMessage(msg));
    }

    scope(name: string): ILogger & IDisposable
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        return new ScopedLogger(this, name);
    }

    private prepareMessage(msg?: string): string
    {
        return `[${this._name}]${msg !== undefined ? ' ' : ''}${msg || null}`;
    }

    dispose(): void
    {
        if (this._disposed)
        {
            throw new Error("Object is disposed");
        }
        this._disposed = true;
    }
}
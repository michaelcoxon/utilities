import { IDisposable } from '../Types';
import { ILogger } from "./_types";

export default class ScopedLogger implements ILogger, IDisposable
{
    readonly #name: string;
    readonly #logger: ILogger;

    #disposed = false;

    constructor(logger: ILogger, name: string)
    {
        this.#logger = logger;
        this.#name = name;
    }

    debug(msg: string): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#logger.debug(this.prepareMessage(msg));
    }

    debugError(err: Error): void;
    debugError(err: Error, msg: string): void;
    debugError(err: Error, msg?: string): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#logger.debugError(err, this.prepareMessage(msg));
    }

    error(msg: string): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#logger.error(this.prepareMessage(msg));
    }

    errorError(err: Error): void;
    errorError(err: Error, msg: string): void;
    errorError(err: Error, msg?: string): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#logger.errorError(err, this.prepareMessage(msg));
    }

    info(msg: string): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#logger.info(this.prepareMessage(msg));
    }

    infoError(err: Error): void;
    infoError(err: Error, msg: string): void
    infoError(err: Error, msg?: string): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#logger.infoError(err, this.prepareMessage(msg));
    }

    trace(msg: string): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#logger.trace(this.prepareMessage(msg));
    }

    traceError(err: Error): void;
    traceError(err: Error, msg: string): void
    traceError(err: Error, msg?: string): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#logger.traceError(err, this.prepareMessage(msg));
    }

    warn(msg: string): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#logger.warn(this.prepareMessage(msg));
    }

    warnError(err: Error): void;
    warnError(err: Error, msg: string): void
    warnError(err: Error, msg?: string): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#logger.warnError(err, this.prepareMessage(msg));
    }

    scope(name: string): ILogger & IDisposable
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        return new ScopedLogger(this, name);
    }

    private prepareMessage(msg?: string): string
    {
        return `[${this.#name}]${msg !== undefined ? ' ' : ''}${msg || null}`;
    }

    dispose(): void
    {
        if (this.#disposed)
        {
            throw new Error("Object is disposed");
        }
        this.#disposed = true;
    }
}
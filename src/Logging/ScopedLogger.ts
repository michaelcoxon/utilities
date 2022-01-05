import { IDisposable } from '../Types';
import { ILogger } from "./_types";
import SR from '../i18n/en.generic.strings.json';

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
        this.#ensureNotDisposed();
        this.#logger.debug(this.#prepareMessage(msg));
    }

    debugError(err: Error): void;
    debugError(err: Error, msg: string): void;
    debugError(err: Error, msg?: string): void
    {
        this.#ensureNotDisposed();
        this.#logger.debugError(err, this.#prepareMessage(msg));
    }

    error(msg: string): void
    {
        this.#ensureNotDisposed();
        this.#logger.error(this.#prepareMessage(msg));
    }

    errorError(err: Error): void;
    errorError(err: Error, msg: string): void;
    errorError(err: Error, msg?: string): void
    {
        this.#ensureNotDisposed();
        this.#logger.errorError(err, this.#prepareMessage(msg));
    }

    info(msg: string): void
    {
        this.#ensureNotDisposed();
        this.#logger.info(this.#prepareMessage(msg));
    }

    infoError(err: Error): void;
    infoError(err: Error, msg: string): void
    infoError(err: Error, msg?: string): void
    {
        this.#ensureNotDisposed();
        this.#logger.infoError(err, this.#prepareMessage(msg));
    }

    trace(msg: string): void
    {
        this.#ensureNotDisposed();
        this.#logger.trace(this.#prepareMessage(msg));
    }

    traceError(err: Error): void;
    traceError(err: Error, msg: string): void
    traceError(err: Error, msg?: string): void
    {
        this.#ensureNotDisposed();
        this.#logger.traceError(err, this.#prepareMessage(msg));
    }

    warn(msg: string): void
    {
        this.#ensureNotDisposed();
        this.#logger.warn(this.#prepareMessage(msg));
    }

    warnError(err: Error): void;
    warnError(err: Error, msg: string): void
    warnError(err: Error, msg?: string): void
    {
        this.#ensureNotDisposed();
        this.#logger.warnError(err, this.#prepareMessage(msg));
    }

    scope(name: string): ILogger & IDisposable
    {
        this.#ensureNotDisposed();
        return new ScopedLogger(this, name);
    }
    
    dispose(): void
    {
        this.#ensureNotDisposed();
        this.#disposed = true;
    }

    #prepareMessage(msg?: string): string
    {
        return `[${this.#name}]${msg !== undefined ? ' ' : ''}${msg || null}`;
    }
   
    #ensureNotDisposed():void
    {
        if (this.#disposed)
        {
            throw new Error(SR.objectIsDisposed);
        }
    }
}
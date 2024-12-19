import { IDisposable } from '../Types';
import { ILogger } from "./_types";
import SR from '../i18n/en/generic.strings';

export default class ScopedLogger implements ILogger, IDisposable
{
    static openScope = '[';
    static closeScope = ']';

    private readonly _scope: string[];
    readonly #name: string;
    readonly #logger: ILogger;

    #disposed = false;

    constructor(logger: ILogger, name: string)
    {
        this.#logger = logger;
        this.#name = name;

        if (ScopedLogger.isScopedLogger(logger))
        {
            this._scope = [...logger._scope, name];
        } else
        {
            this._scope = [name];
        }
    }
    
    static isScopedLogger<T>(subject: T | ScopedLogger): subject is ScopedLogger
    {
        return subject["_scope"] !== undefined;
    }

    debug(msg: string, ...args: unknown[]): void
    {
        this.#ensureNotDisposed();
        this.#logger.debug(this.#prepareMessage(msg), ...args);
    }

    debugError(err: Error, msg?: string, ...args: unknown[]): void
    {
        this.#ensureNotDisposed();
        this.#logger.debugError(err, this.#prepareMessage(msg), ...args);
    }

    error(msg: string, ...args: unknown[]): void
    {
        this.#ensureNotDisposed();
        this.#logger.error(this.#prepareMessage(msg), ...args);
    }

    errorError(err: Error, msg?: string, ...args: unknown[]): void
    {
        this.#ensureNotDisposed();
        this.#logger.errorError(err, this.#prepareMessage(msg), ...args);
    }

    info(msg: string, ...args: unknown[]): void
    {
        this.#ensureNotDisposed();
        this.#logger.info(this.#prepareMessage(msg), ...args);
    }

    infoError(err: Error, msg?: string, ...args: unknown[]): void
    {
        this.#ensureNotDisposed();
        this.#logger.infoError(err, this.#prepareMessage(msg), ...args);
    }

    trace(msg: string, ...args: unknown[]): void
    {
        this.#ensureNotDisposed();
        this.#logger.trace(this.#prepareMessage(msg), ...args);
    }

    traceError(err: Error, msg?: string, ...args: unknown[]): void
    {
        this.#ensureNotDisposed();
        this.#logger.traceError(err, this.#prepareMessage(msg), ...args);
    }

    warn(msg: string, ...args: unknown[]): void
    {
        this.#ensureNotDisposed();
        this.#logger.warn(this.#prepareMessage(msg), ...args);
    }

    warnError(err: Error, msg?: string, ...args: unknown[]): void
    {
        this.#ensureNotDisposed();
        this.#logger.warnError(err, this.#prepareMessage(msg), ...args);
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
        return `${ScopedLogger.openScope}${this.#name}${ScopedLogger.closeScope}${msg !== undefined ? ' ' : ''}${msg || null}`;
    }

    #ensureNotDisposed(): void
    {
        if (this.#disposed)
        {
            throw new Error(SR.objectIsDisposed);
        }
    }
}

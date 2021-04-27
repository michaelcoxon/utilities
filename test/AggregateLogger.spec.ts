import { expect, assert } from 'chai';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import 'mocha';

import AggregateLogger from '../src/AggregateLogger';
import ConsoleLogger from '../src/ConsoleLogger';
import { ILogger, LogLevel } from '../src/ILogger';
import ErrorHelper from '../src/ErrorHelper';
import { IDisposable } from '../src/IDisposable';
import ScopedLogger from '../src/ScopedLogger';
import IndentedStringBuilder from "../src/IndentedStringBuilder";

class TestLogger implements ILogger
{
    private readonly _context: Mocha.Context;
    private readonly _logCallback: (level: LogLevel, sb: IndentedStringBuilder) => void;

    constructor(context: Mocha.Context, logCallback: (level: LogLevel, sb: IndentedStringBuilder) => void)
    {
        this._context = context;
        this._logCallback = logCallback;
    }

    debug(msg: string): void
    {
        this._logCallback(LogLevel.Debug, new IndentedStringBuilder(0, msg));
    }

    debugError(err: Error): void;
    debugError(err: Error, msg: string): void
    debugError(err: Error, msg?: string): void
    {
        const sb = new IndentedStringBuilder(0);
        if (msg !== undefined)
        {
            sb.appendLine(msg);
            sb.indent();
            ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            ErrorHelper.errorToLogMessage(err, sb);
        }
        this._logCallback(LogLevel.Debug, sb);
    }

    error(msg: string): void
    {
        this._logCallback(LogLevel.Error, new IndentedStringBuilder(0, msg));
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
            ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            ErrorHelper.errorToLogMessage(err, sb);
        }
        this._logCallback(LogLevel.Error, sb);
    }

    info(msg: string): void
    {
        this._logCallback(LogLevel.Info, new IndentedStringBuilder(0, msg));
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
            ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            ErrorHelper.errorToLogMessage(err, sb);
        }
        this._logCallback(LogLevel.Info, sb);
    }

    trace(msg: string): void
    {
        this._logCallback(LogLevel.Trace, new IndentedStringBuilder(0, msg));
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
            ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            ErrorHelper.errorToLogMessage(err, sb);
        }
        this._logCallback(LogLevel.Trace, sb);
    }

    warn(msg: string): void
    {
        this._logCallback(LogLevel.Warn, new IndentedStringBuilder(0, msg));
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
            ErrorHelper.errorToLogMessage(err, sb);
            sb.unindent();
        }
        else
        {
            ErrorHelper.errorToLogMessage(err, sb);
        }
        this._logCallback(LogLevel.Warn, sb);
    }

    scope(name: string): ILogger & IDisposable
    {
        return new ScopedLogger(this, name);
    }
}

describe("AggregateLogger.constructor", () =>
{
    it("should return a new AggregateLogger", () =>
    {
        const actual = new AggregateLogger();

        assert.isNotNull(actual);
    });

    it("should return a new AggregateLogger again", () =>
    {
        const actual = new AggregateLogger(new ConsoleLogger(console));

        assert.isNotNull(actual);
    });
});

describe("AggregateLogger.scope", () =>
{
    it("should return a scoped AggregateLogger", function ()
    {
        let logCallback = sinon.spy();

        const actual = new AggregateLogger(new TestLogger(this, logCallback));

        actual.info("info message");

        expect(logCallback.calledWith(LogLevel.Info, "info message"));

        const scope = actual.scope("new scope");        

        scope.info("info message");

        expect(logCallback.calledWith(LogLevel.Info, "[new scope] info message"));

    });
});

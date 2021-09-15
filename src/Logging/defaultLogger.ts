import noop from '../Utilities/noop';
import { ILogger } from './_types';

export const NullLogger: ILogger = Object.freeze({
    debug: noop,
    debugError: noop,
    error: noop,
    errorError: noop,
    info: noop,
    infoError: noop,
    trace: noop,
    traceError: noop,
    warn: noop,
    warnError: noop,
    scope: () => Object.assign({ dispose: noop }, _defaultLogger),
});

let _defaultLogger = NullLogger;

export function getDefaultLogger(): ILogger
{
    return _defaultLogger;
}

export function setDefaultLogger(logger: ILogger): void
{
    _defaultLogger = logger;
}
import { LogLevel } from './_types.js';

/**
 * Returns true if the desired log level is valid for the currently configured logging verbosity
 * @param desiredLevel The log level you want to log at
 * @param loggingVerbosity The cut off for when logging should be hidden
 */
export default function testLogVerbosity(desiredLevel: LogLevel, loggingVerbosity: LogLevel): boolean
{
    const isError = desiredLevel === LogLevel.Error;
    const isWarn = desiredLevel === LogLevel.Warn;
    const isInfo = desiredLevel === LogLevel.Info;
    const isTrace = desiredLevel === LogLevel.Trace;
    const isDebug = desiredLevel === LogLevel.Debug;

    return loggingVerbosity === LogLevel.Error && isError
        || loggingVerbosity === LogLevel.Warn && (isError || isWarn)
        || loggingVerbosity === LogLevel.Info && (isError || isWarn || isInfo)
        || loggingVerbosity === LogLevel.Trace && (isError || isWarn || isInfo || isTrace)
        || loggingVerbosity === LogLevel.Debug && (isError || isWarn || isInfo || isTrace || isDebug);
}

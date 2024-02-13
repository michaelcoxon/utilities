import { IConsole } from '../IConsole';
import ConsoleLogger from './ConsoleLogger';
import { LogLevel } from './_types';



describe("ConsoleLogger.constructor", () =>
{
    it("should return a new ConsoleLogger", () =>
    {
        const actual = new ConsoleLogger(console);

        expect(actual).not.toBeNull();
    });
});

describe("ConsoleLogger.log", () =>
{
    it("should always log", () =>
    {
        const consoleImpl: IConsole = {
            log: jest.fn(_ => { })
        };

        const actual = new ConsoleLogger(consoleImpl, {
            loggingVerbosity: LogLevel.Debug,
            useTraceMethodForTraceLogLevel: true
        });

        actual.debug("");
        actual.error("");
        actual.info("");
        actual.trace("");
        actual.warn("");

        expect(consoleImpl.log).toHaveBeenCalledTimes(5);
    });
});
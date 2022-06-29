import { LogLevel } from '../../src/Logging';
import AggregateLogger from '../../src/Logging/AggregateLogger';
import ConsoleLogger from '../../src/Logging/ConsoleLogger';

describe("AggregateLogger.constructor", () =>
{
    it("should return a new AggregateLogger", () =>
    {
        const actual = new AggregateLogger();

        expect(actual).not.toBeNull();
    });

    it("should return a new AggregateLogger again", () =>
    {
        const actual = new AggregateLogger(new ConsoleLogger(console));

        expect(actual).not.toBeNull();
    });


    it("one big test", () =>
    {
        const actual = new AggregateLogger(new ConsoleLogger(console, {
            loggingVerbosity: LogLevel.Debug,
            useTraceMethodForTraceLogLevel: true,
        }));
        console.log("start34");
        let counter = 0;

        actual.debug(`${counter++}`);
        actual.debugError(new Error(`${counter++}`));
        actual.debugError(new Error(`${counter++}`), `${counter++}`);

        actual.scope(`${counter++}`).debug(`${counter++}`);
        actual.scope(`${counter++}`).debugError(new Error(`${counter++}`));
        actual.scope(`${counter++}`).debugError(new Error(`${counter++}`), `${counter++}`);

        expect(actual).not.toBeNull();
    });
});

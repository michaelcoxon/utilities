import { LogLevel } from '../../src/Logging';
import AggregateLogger from '../../src/Logging/AggregateLogger';
import ConsoleLogger from '../../src/Logging/ConsoleLogger';
import { TestLogger } from '../TestHelpers/TestLogger';

describe("AggregateLogger.constructor", () =>
{
    it("should return a new AggregateLogger", () =>
    {
        const actual = new AggregateLogger();

        expect(actual).not.toBeNull();
    });

    it("should return a new AggregateLogger again", () =>
    {
        const log = jest.fn();
        const actual = new AggregateLogger(new TestLogger(log));

        expect(actual).not.toBeNull();

        expect(log).toBeCalledTimes(0);
        actual.debug("asdf");
        expect(log).toBeCalledTimes(1);
    });


    it("one big test", () =>
    {
        const log1 = jest.fn();
        const log2 = jest.fn();
        const actual = new AggregateLogger(new TestLogger(log1), new TestLogger(log2));
        console.log("start34");
        let counter = 0;

        actual.debug(`${counter++}`);
        actual.debugError(new Error(`${counter++}`));
        actual.debugError(new Error(`${counter++}`), `${counter++}`);

        actual.trace(`${counter++}`);
        actual.traceError(new Error(`${counter++}`));
        actual.traceError(new Error(`${counter++}`), `${counter++}`);

        actual.info(`${counter++}`);
        actual.infoError(new Error(`${counter++}`));
        actual.infoError(new Error(`${counter++}`), `${counter++}`);

        actual.warn(`${counter++}`);
        actual.warnError(new Error(`${counter++}`));
        actual.warnError(new Error(`${counter++}`), `${counter++}`);

        actual.error(`${counter++}`);
        actual.errorError(new Error(`${counter++}`));
        actual.errorError(new Error(`${counter++}`), `${counter++}`);

        actual.scope(`${counter++}`).debug(`${counter++}`);
        actual.scope(`${counter++}`).debugError(new Error(`${counter++}`));
        actual.scope(`${counter++}`).debugError(new Error(`${counter++}`), `${counter++}`);

        expect(log1).toBeCalledTimes(18);
        expect(log2).toBeCalledTimes(18);
    });
});

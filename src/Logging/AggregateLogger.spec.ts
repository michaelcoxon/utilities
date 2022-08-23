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
});

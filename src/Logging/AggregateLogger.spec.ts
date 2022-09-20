import AggregateLogger from './AggregateLogger';
import ConsoleLogger from './ConsoleLogger';

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

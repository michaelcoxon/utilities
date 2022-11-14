﻿import AggregateLogger from './AggregateLogger.js';
import ConsoleLogger from './ConsoleLogger.js';

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

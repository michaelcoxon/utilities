import { LogLevel } from '../src';
import { testLogVerbosity } from '../src';

function testLogVerbosityTest(expected: boolean, desiredLevel: LogLevel, loggingVerbosity: LogLevel)
{
    const actual = testLogVerbosity(desiredLevel, loggingVerbosity);
    expect(actual).toEqual(expected);
}

describe("Log verbosity set to Debug", () =>
{
    it("should return true when Debug is desired", () => testLogVerbosityTest(true, LogLevel.Debug, LogLevel.Debug));
    it("should return true when Error is desired", () => testLogVerbosityTest(true, LogLevel.Error, LogLevel.Debug));
    it("should return true when Info is desired", () => testLogVerbosityTest(true, LogLevel.Info, LogLevel.Debug));
    it("should return true when Trace is desired", () => testLogVerbosityTest(true, LogLevel.Trace, LogLevel.Debug));
    it("should return true when Warn is desired", () => testLogVerbosityTest(true, LogLevel.Warn, LogLevel.Debug));
});

describe("Log verbosity set to Error", () =>
{
    it("should return false when Debug is desired", () => testLogVerbosityTest(false, LogLevel.Debug, LogLevel.Error));
    it("should return true when Error is desired", () => testLogVerbosityTest(true, LogLevel.Error, LogLevel.Error));
    it("should return false when Info is desired", () => testLogVerbosityTest(false, LogLevel.Info, LogLevel.Error));
    it("should return false when Trace is desired", () => testLogVerbosityTest(false, LogLevel.Trace, LogLevel.Error));
    it("should return false when Warn is desired", () => testLogVerbosityTest(false, LogLevel.Warn, LogLevel.Error));
});

describe("Log verbosity set to Info", () =>
{
    it("should return false when Debug is desired", () => testLogVerbosityTest(false, LogLevel.Debug, LogLevel.Info));
    it("should return true when Error is desired", () => testLogVerbosityTest(true, LogLevel.Error, LogLevel.Info));
    it("should return true when Info is desired", () => testLogVerbosityTest(true, LogLevel.Info, LogLevel.Info));
    it("should return false when Trace is desired", () => testLogVerbosityTest(false, LogLevel.Trace, LogLevel.Info));
    it("should return true when Warn is desired", () => testLogVerbosityTest(true, LogLevel.Warn, LogLevel.Info));
});

describe("Log verbosity set to Trace", () =>
{
    it("should return false when Debug is desired", () => testLogVerbosityTest(false, LogLevel.Debug, LogLevel.Trace));
    it("should return true when Error is desired", () => testLogVerbosityTest(true, LogLevel.Error, LogLevel.Trace));
    it("should return true when Info is desired", () => testLogVerbosityTest(true, LogLevel.Info, LogLevel.Trace));
    it("should return true when Trace is desired", () => testLogVerbosityTest(true, LogLevel.Trace, LogLevel.Trace));
    it("should return true when Warn is desired", () => testLogVerbosityTest(true, LogLevel.Warn, LogLevel.Trace));
});

describe("Log verbosity set to Warn", () =>
{
    it("should return false when Debug is desired", () => testLogVerbosityTest(false, LogLevel.Debug, LogLevel.Warn));
    it("should return true when Error is desired", () => testLogVerbosityTest(true, LogLevel.Error, LogLevel.Warn));
    it("should return false when Info is desired", () => testLogVerbosityTest(false, LogLevel.Info, LogLevel.Warn));
    it("should return false when Trace is desired", () => testLogVerbosityTest(false, LogLevel.Trace, LogLevel.Warn));
    it("should return true when Warn is desired", () => testLogVerbosityTest(true, LogLevel.Warn, LogLevel.Warn));
});

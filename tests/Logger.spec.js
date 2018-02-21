"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ILogger_1 = require("../lib/ILogger");
var chai_1 = require("chai");
require("mocha");
function testLogVerbosityTest(expect, desiredLevel, loggingVerbosity) {
    var actual = ILogger_1.testLogVerbosity(desiredLevel, loggingVerbosity);
    chai_1.assert.equal(actual, expect);
}
describe("Log verbosity set to Debug", function () {
    it("should return true when Debug is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Debug, ILogger_1.LogLevel.Debug); });
    it("should return true when Error is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Error, ILogger_1.LogLevel.Debug); });
    it("should return true when Info is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Info, ILogger_1.LogLevel.Debug); });
    it("should return true when Trace is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Trace, ILogger_1.LogLevel.Debug); });
    it("should return true when Warn is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Warn, ILogger_1.LogLevel.Debug); });
});
describe("Log verbosity set to Error", function () {
    it("should return false when Debug is desired", function () { return testLogVerbosityTest(false, ILogger_1.LogLevel.Debug, ILogger_1.LogLevel.Error); });
    it("should return true when Error is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Error, ILogger_1.LogLevel.Error); });
    it("should return false when Info is desired", function () { return testLogVerbosityTest(false, ILogger_1.LogLevel.Info, ILogger_1.LogLevel.Error); });
    it("should return false when Trace is desired", function () { return testLogVerbosityTest(false, ILogger_1.LogLevel.Trace, ILogger_1.LogLevel.Error); });
    it("should return false when Warn is desired", function () { return testLogVerbosityTest(false, ILogger_1.LogLevel.Warn, ILogger_1.LogLevel.Error); });
});
describe("Log verbosity set to Info", function () {
    it("should return false when Debug is desired", function () { return testLogVerbosityTest(false, ILogger_1.LogLevel.Debug, ILogger_1.LogLevel.Info); });
    it("should return true when Error is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Error, ILogger_1.LogLevel.Info); });
    it("should return true when Info is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Info, ILogger_1.LogLevel.Info); });
    it("should return false when Trace is desired", function () { return testLogVerbosityTest(false, ILogger_1.LogLevel.Trace, ILogger_1.LogLevel.Info); });
    it("should return true when Warn is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Warn, ILogger_1.LogLevel.Info); });
});
describe("Log verbosity set to Trace", function () {
    it("should return false when Debug is desired", function () { return testLogVerbosityTest(false, ILogger_1.LogLevel.Debug, ILogger_1.LogLevel.Trace); });
    it("should return true when Error is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Error, ILogger_1.LogLevel.Trace); });
    it("should return true when Info is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Info, ILogger_1.LogLevel.Trace); });
    it("should return true when Trace is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Trace, ILogger_1.LogLevel.Trace); });
    it("should return true when Warn is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Warn, ILogger_1.LogLevel.Trace); });
});
describe("Log verbosity set to Warn", function () {
    it("should return false when Debug is desired", function () { return testLogVerbosityTest(false, ILogger_1.LogLevel.Debug, ILogger_1.LogLevel.Warn); });
    it("should return true when Error is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Error, ILogger_1.LogLevel.Warn); });
    it("should return false when Info is desired", function () { return testLogVerbosityTest(false, ILogger_1.LogLevel.Info, ILogger_1.LogLevel.Warn); });
    it("should return false when Trace is desired", function () { return testLogVerbosityTest(false, ILogger_1.LogLevel.Trace, ILogger_1.LogLevel.Warn); });
    it("should return true when Warn is desired", function () { return testLogVerbosityTest(true, ILogger_1.LogLevel.Warn, ILogger_1.LogLevel.Warn); });
});
//# sourceMappingURL=Logger.spec.js.map
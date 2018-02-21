"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path_1 = require("../lib/Path");
var chai_1 = require("chai");
require("mocha");
describe("Path.combine", function () {
    it("should return a combined path", function () {
        var components = ["path", "to", "file"];
        var expect = "path/to/file";
        var actual = Path_1.Path.combine.apply(Path_1.Path, components);
        chai_1.assert.equal(actual, expect);
    });
});
//# sourceMappingURL=Path.spec.js.map
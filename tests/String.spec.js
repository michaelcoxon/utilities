"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Strings = require("../lib/Strings");
var chai_1 = require("chai");
require("mocha");
describe("String.empty", function () {
    it("should return an empty string", function () {
        chai_1.assert.equal(Strings.empty, '');
    });
});
describe("String.format", function () {
    it("should format the string in order", function () {
        var format = "{0}, {1}, {2} and {3}";
        var args = [4, 5, 6, 7];
        var expect = "4, 5, 6 and 7";
        var actual = Strings.format.apply(Strings, [format].concat(args));
        chai_1.assert.equal(actual, expect);
    });
    it("should format the string in a different order", function () {
        var format = "{0}, {2}, {1} and {3}";
        var args = [4, 6, 5, 7];
        var expect = "4, 5, 6 and 7";
        var actual = Strings.format.apply(Strings, [format].concat(args));
        chai_1.assert.equal(actual, expect);
    });
});
describe("String.trim", function () {
    it("should return a string with the whitespace on the start and end removed", function () {
        var subject = "   asdf      ";
        var expect = "asdf";
        var actual = Strings.trim(subject);
        chai_1.assert.equal(actual, expect);
    });
    it("should return a string with the characters on the start and end removed", function () {
        var subject = ".,.,asdf.,.,.,.";
        var expect = "asdf";
        var actual = Strings.trim(subject, '.,');
        chai_1.assert.equal(actual, expect);
    });
});
describe("String.trimStart", function () {
    it("should return a string with the whitespace on the start and end removed", function () {
        var subject = "   asdf      ";
        var expect = "asdf      ";
        var actual = Strings.trimStart(subject);
        chai_1.assert.equal(actual, expect);
    });
    it("should return a string with the characters on the start and end removed", function () {
        var subject = ".,.,asdf.,.,.,.";
        var expect = "asdf.,.,.,.";
        var actual = Strings.trimStart(subject, '.,');
        chai_1.assert.equal(actual, expect);
    });
});
describe("String.trimEnd", function () {
    it("should return a string with the whitespace on the start and end removed", function () {
        var subject = "   asdf      ";
        var expect = "   asdf";
        var actual = Strings.trimEnd(subject);
        chai_1.assert.equal(actual, expect);
    });
    it("should return a string with the characters on the start and end removed", function () {
        var subject = ".,.,asdf.,.,.,.";
        var expect = ".,.,asdf";
        var actual = Strings.trimEnd(subject, '.,');
        chai_1.assert.equal(actual, expect);
    });
});
describe("String.isNullOrEmpty", function () {
    it("should return true if the string is undefined", function () {
        chai_1.assert.equal(Strings.isNullOrEmpty(), true);
    });
    it("should return true if the string is null", function () {
        chai_1.assert.equal(Strings.isNullOrEmpty(null), true);
    });
    it("should return true if the string is empty", function () {
        chai_1.assert.equal(Strings.isNullOrEmpty(''), true);
    });
    it("should return false if the string is valid", function () {
        chai_1.assert.equal(Strings.isNullOrEmpty('a'), false);
    });
});
describe("String.isNullOrWhitespace", function () {
    it("should return true if the string is undefined", function () {
        chai_1.assert.equal(Strings.isNullOrWhitespace(), true);
    });
    it("should return true if the string is null", function () {
        chai_1.assert.equal(Strings.isNullOrWhitespace(null), true);
    });
    it("should return true if the string is whitespace", function () {
        chai_1.assert.equal(Strings.isNullOrWhitespace('   '), true);
    });
    it("should return false if the string is empty", function () {
        chai_1.assert.equal(Strings.isNullOrWhitespace(''), false);
    });
    it("should return false if the string is valid", function () {
        chai_1.assert.equal(Strings.isNullOrWhitespace('a'), false);
    });
});
describe("String.toCharArray", function () {
    it("should return an array with all characters", function () {
        chai_1.assert.sameOrderedMembers(Strings.toCharArray('1234'), ['1', '2', '3', '4']);
    });
    it("should return an empty array if the string is empty", function () {
        chai_1.assert.sameOrderedMembers(Strings.toCharArray(''), []);
    });
});
//# sourceMappingURL=String.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exceptions = require("../lib/Exceptions");
var chai_1 = require("chai");
require("mocha");
function test(exceptionType, exception) {
    describe("Exceptions." + exceptionType.name, function () {
        it("should return an " + exceptionType.name, function () {
            try {
                throw exception();
            }
            catch (e) {
                if (!(e instanceof exceptionType)) {
                    chai_1.assert.fail();
                }
            }
        });
    });
}
test(Exceptions.ArgumentException, function () { return new Exceptions.ArgumentException('asdf'); });
test(Exceptions.ArgumentUndefinedException, function () { return new Exceptions.ArgumentUndefinedException('asdf'); });
test(Exceptions.ArgumentNullException, function () { return new Exceptions.ArgumentNullException('asdf'); });
test(Exceptions.InvalidTypeException, function () { return new Exceptions.InvalidTypeException('asdf', 'asdf'); });
test(Exceptions.NotImplementedException, function () { return new Exceptions.NotImplementedException(); });
test(Exceptions.NotSupportedException, function () { return new Exceptions.NotSupportedException(); });
test(Exceptions.OutOfBoundsException, function () { return new Exceptions.OutOfBoundsException('asdf', 0, 1); });
test(Exceptions.IndexOutOfRangeException, function () { return new Exceptions.IndexOutOfRangeException('asdf', -1, 0, 1); });
test(Exceptions.FileNotFoundException, function () { return new Exceptions.FileNotFoundException('asdf'); });
test(Exceptions.KeyNotFoundException, function () { return new Exceptions.KeyNotFoundException('asdf'); });
test(Exceptions.KeyAlreadyDefinedException, function () { return new Exceptions.KeyAlreadyDefinedException('asdf'); });
//# sourceMappingURL=Exceptions.spec.js.map
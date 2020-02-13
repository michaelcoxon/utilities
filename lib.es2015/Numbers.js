"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Integers_1 = require("./Integers");
var Numbers;
(function (Numbers) {
    function toByte(value) {
        return new Integers_1.Byte(value);
    }
    Numbers.toByte = toByte;
    function toInt16(value) {
        return new Integers_1.Int16(value);
    }
    Numbers.toInt16 = toInt16;
    function toInt32(value) {
        return new Integers_1.Int32(value);
    }
    Numbers.toInt32 = toInt32;
    function toSignedByte(value) {
        return new Integers_1.SignedByte(value);
    }
    Numbers.toSignedByte = toSignedByte;
    function toUnsignedInt16(value) {
        return new Integers_1.UnsignedInt16(value);
    }
    Numbers.toUnsignedInt16 = toUnsignedInt16;
    function toUnsignedInt32(value) {
        return new Integers_1.UnsignedInt32(value);
    }
    Numbers.toUnsignedInt32 = toUnsignedInt32;
    function isMultipleOf(value, multiple) {
        return (value % multiple) === 0;
    }
    Numbers.isMultipleOf = isMultipleOf;
    function isEven(value) {
        return isMultipleOf(value, 2);
    }
    Numbers.isEven = isEven;
    function isOdd(value) {
        return !isEven(value);
    }
    Numbers.isOdd = isOdd;
})(Numbers = exports.Numbers || (exports.Numbers = {}));
//# sourceMappingURL=Numbers.js.map
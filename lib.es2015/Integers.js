"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("./Exceptions");
const Result_1 = require("./Result");
class Byte {
    constructor(value) {
        ensureInt(value, Byte.minValue, Byte.maxValue);
        this._value = value;
    }
    valueOf() {
        return this._value.valueOf() & 0xFF;
    }
    toString() {
        return this.valueOf().toString();
    }
    static parse(value) {
        const int = parseInt(value);
        return new Byte(int);
    }
    static tryParse(value) {
        const int = parseInt(value);
        try {
            ensureInt(int, Byte.minValue, Byte.maxValue);
            return Result_1.Result.ok(new Byte(int));
        }
        catch (ex) {
            if (ex instanceof Exceptions_1.Exception) {
                return Result_1.Result.fail(ex.message);
            }
            else if (ex instanceof Error) {
                return Result_1.Result.fail(ex.message);
            }
            else {
                return Result_1.Result.fail(ex);
            }
        }
    }
}
/** The largest number that can be represented. Equal to 255. */
Byte.maxValue = 255;
/** The lowest number that can be represented. Equal to 0. */
Byte.minValue = 0;
exports.Byte = Byte;
class Int16 {
    constructor(value) {
        ensureInt(value, Int16.minValue, Int16.maxValue);
        this._value = value;
    }
    valueOf() {
        return this._value.valueOf() & 0xFFFF;
    }
    toString() {
        return this.valueOf().toString();
    }
    static parse(value) {
        const int = parseInt(value);
        return new Int16(int);
    }
    static tryParse(value) {
        const int = parseInt(value);
        try {
            ensureInt(int, Int16.minValue, Int16.maxValue);
            return Result_1.Result.ok(new Int16(int));
        }
        catch (ex) {
            if (ex instanceof Exceptions_1.Exception) {
                return Result_1.Result.fail(ex.message);
            }
            else if (ex instanceof Error) {
                return Result_1.Result.fail(ex.message);
            }
            else {
                return Result_1.Result.fail(ex);
            }
        }
    }
}
/** The largest number that can be represented. Equal to 32767. */
Int16.maxValue = 32767;
/** The lowest number that can be represented. Equal to -32768. */
Int16.minValue = -32768;
exports.Int16 = Int16;
class Int32 {
    constructor(value) {
        ensureInt(value, Int32.minValue, Int32.maxValue);
        this._value = value;
    }
    valueOf() {
        return this._value.valueOf() & 0xFFFFFFFF;
    }
    toString() {
        return this.valueOf().toString();
    }
    static parse(value) {
        const int = parseInt(value);
        return new Int32(int);
    }
    static tryParse(value) {
        const int = parseInt(value);
        try {
            ensureInt(int, Int32.minValue, Int32.maxValue);
            return Result_1.Result.ok(new Int32(int));
        }
        catch (ex) {
            if (ex instanceof Exceptions_1.Exception) {
                return Result_1.Result.fail(ex.message);
            }
            else if (ex instanceof Error) {
                return Result_1.Result.fail(ex.message);
            }
            else {
                return Result_1.Result.fail(ex);
            }
        }
    }
}
/** The largest number that can be represented. Equal to 2,147,483,647. */
Int32.maxValue = 2147483647;
/** The lowest number that can be represented. Equal to -2,147,483,648. */
Int32.minValue = -2147483648;
exports.Int32 = Int32;
class SignedByte {
    constructor(value) {
        ensureInt(value, SignedByte.minValue, SignedByte.maxValue);
        this._value = value;
    }
    valueOf() {
        return this._value.valueOf() & 0x7F;
    }
    toString() {
        return this.valueOf().toString();
    }
    static parse(value) {
        const int = parseInt(value);
        return new SignedByte(int);
    }
    static tryParse(value) {
        const int = parseInt(value);
        try {
            ensureInt(int, SignedByte.minValue, SignedByte.maxValue);
            return Result_1.Result.ok(new SignedByte(int));
        }
        catch (ex) {
            if (ex instanceof Exceptions_1.Exception) {
                return Result_1.Result.fail(ex.message);
            }
            else if (ex instanceof Error) {
                return Result_1.Result.fail(ex.message);
            }
            else {
                return Result_1.Result.fail(ex);
            }
        }
    }
}
/** The largest number that can be represented. Equal to 127. */
SignedByte.maxValue = 127;
/** The lowest number that can be represented. Equal to -127. */
SignedByte.minValue = -127;
exports.SignedByte = SignedByte;
class UnsignedInt16 {
    constructor(value) {
        ensureInt(value, UnsignedInt16.minValue, UnsignedInt16.maxValue);
        this._value = value;
    }
    valueOf() {
        return this._value.valueOf() & 0xFFFF;
    }
    toString() {
        return this.valueOf().toString();
    }
    static parse(value) {
        const int = parseInt(value);
        return new UnsignedInt16(int);
    }
    static tryParse(value) {
        const int = parseInt(value);
        try {
            ensureInt(int, UnsignedInt16.minValue, UnsignedInt16.maxValue);
            return Result_1.Result.ok(new UnsignedInt16(int));
        }
        catch (ex) {
            if (ex instanceof Exceptions_1.Exception) {
                return Result_1.Result.fail(ex.message);
            }
            else if (ex instanceof Error) {
                return Result_1.Result.fail(ex.message);
            }
            else {
                return Result_1.Result.fail(ex);
            }
        }
    }
}
/** The largest number that can be represented. Equal to 65,535. */
UnsignedInt16.maxValue = 65535;
/** The lowest number that can be represented. Equal to 0. */
UnsignedInt16.minValue = 0;
exports.UnsignedInt16 = UnsignedInt16;
class UnsignedInt32 {
    constructor(value) {
        ensureInt(value, UnsignedInt32.minValue, UnsignedInt32.maxValue);
        this._value = value;
    }
    valueOf() {
        return this._value.valueOf() & 0xFFFFFFFF;
    }
    toString() {
        return this.valueOf().toString();
    }
    static parse(value) {
        const int = parseInt(value);
        return new UnsignedInt32(int);
    }
    static tryParse(value) {
        const int = parseInt(value);
        try {
            ensureInt(int, UnsignedInt32.minValue, UnsignedInt32.maxValue);
            return Result_1.Result.ok(new UnsignedInt32(int));
        }
        catch (ex) {
            if (ex instanceof Exceptions_1.Exception) {
                return Result_1.Result.fail(ex.message);
            }
            else if (ex instanceof Error) {
                return Result_1.Result.fail(ex.message);
            }
            else {
                return Result_1.Result.fail(ex);
            }
        }
    }
}
/** The largest number that can be represented. Equal to 4,294,967,295. */
UnsignedInt32.maxValue = 4294967295;
/** The lowest number that can be represented. Equal to 0. */
UnsignedInt32.minValue = 0;
exports.UnsignedInt32 = UnsignedInt32;
function ensureInt(value, minValue, maxValue) {
    if (!Number.isInteger(value)) {
        throw new Exceptions_1.ArgumentException('value', 'Value is not a whole number');
    }
    try {
        if (value > maxValue || value < minValue) {
            throw new Exceptions_1.ArgumentException('value', 'Value is out of bounds', new Exceptions_1.OutOfBoundsException('value', minValue, maxValue));
        }
    }
    catch (ex) {
        if (ex instanceof Exceptions_1.Exception) {
            throw new Exceptions_1.ArgumentException('value', ex.message, ex);
        }
        throw ex;
    }
}
//# sourceMappingURL=Integers.js.map
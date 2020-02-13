"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Integers_1 = require("./Integers");
const Strings_1 = require("./Strings");
const ILogger_1 = require("./ILogger");
const logger = ILogger_1.getDefaultLogger();
/**
 * Represents a GUID
 */
class Guid {
    constructor(a, b, c, d, e, f, g, h, i, j, k) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._e = e;
        this._f = f;
        this._g = g;
        this._h = h;
        this._i = i;
        this._j = j;
        this._k = k;
    }
    toString() {
        return Strings_1.Strings.padLeft((this._a.valueOf() >>> 0).toString(16), 8, '0') + '-' +
            Strings_1.Strings.padLeft((this._b.valueOf() >>> 0).toString(16), 4, '0') + '-' +
            Strings_1.Strings.padLeft((this._c.valueOf() >>> 0).toString(16), 4, '0') + '-' +
            Strings_1.Strings.padLeft((this._d.valueOf() >>> 0).toString(16), 2, '0') +
            Strings_1.Strings.padLeft((this._e.valueOf() >>> 0).toString(16), 2, '0') + '-' +
            Strings_1.Strings.padLeft((this._f.valueOf() >>> 0).toString(16), 2, '0') +
            Strings_1.Strings.padLeft((this._g.valueOf() >>> 0).toString(16), 2, '0') +
            Strings_1.Strings.padLeft((this._h.valueOf() >>> 0).toString(16), 2, '0') +
            Strings_1.Strings.padLeft((this._i.valueOf() >>> 0).toString(16), 2, '0') +
            Strings_1.Strings.padLeft((this._j.valueOf() >>> 0).toString(16), 2, '0') +
            Strings_1.Strings.padLeft((this._k.valueOf() >>> 0).toString(16), 2, '0');
    }
    valueOf() {
        return this.toString();
    }
    /** Creates a new v4 GUID (its random except for the version nibble)*/
    static newGuid() {
        return new Guid(randomInt32(), randomInt16(), new Integers_1.UnsignedInt16((randomInt16().valueOf() & 0x0FFF) | 0x4000), new Integers_1.Byte(randomByte().valueOf() | 0xA), randomByte(), randomByte(), randomByte(), randomByte(), randomByte(), randomByte(), randomByte());
    }
    static parseString(str) {
        const guid = str.replace(/[-\{\}\[\]]/gi, '');
        return new Guid(new Integers_1.UnsignedInt32(parseInt(guid.substr(0, 8), 16)), new Integers_1.UnsignedInt16(parseInt(guid.substr(8, 4), 16)), new Integers_1.UnsignedInt16(parseInt(guid.substr(12, 4), 16)), new Integers_1.Byte(parseInt(guid.substr(16, 2), 16)), new Integers_1.Byte(parseInt(guid.substr(18, 2), 16)), new Integers_1.Byte(parseInt(guid.substr(20, 2), 16)), new Integers_1.Byte(parseInt(guid.substr(22, 2), 16)), new Integers_1.Byte(parseInt(guid.substr(24, 2), 16)), new Integers_1.Byte(parseInt(guid.substr(26, 2), 16)), new Integers_1.Byte(parseInt(guid.substr(28, 2), 16)), new Integers_1.Byte(parseInt(guid.substr(30, 2), 16)));
    }
}
Guid.empty = new Guid(new Integers_1.UnsignedInt32(0), new Integers_1.UnsignedInt16(0), new Integers_1.UnsignedInt16(0), new Integers_1.Byte(0), new Integers_1.Byte(0), new Integers_1.Byte(0), new Integers_1.Byte(0), new Integers_1.Byte(0), new Integers_1.Byte(0), new Integers_1.Byte(0), new Integers_1.Byte(0));
exports.Guid = Guid;
function randomByte() {
    return new Integers_1.Byte(randomNumber(Integers_1.Byte.minValue.valueOf(), Integers_1.Byte.maxValue.valueOf()));
}
function randomInt16() {
    return new Integers_1.UnsignedInt16(randomNumber(Integers_1.UnsignedInt16.minValue.valueOf(), Integers_1.UnsignedInt16.maxValue.valueOf()));
}
function randomInt32() {
    return new Integers_1.UnsignedInt32(randomNumber(Integers_1.UnsignedInt32.minValue.valueOf(), Integers_1.UnsignedInt32.maxValue.valueOf()));
}
function randomNumber(min, max) {
    let rand = Math.random();
    const num = Math.floor(rand * (max + 1)) + min;
    return num > max ? max : num;
}
//# sourceMappingURL=Guid.js.map
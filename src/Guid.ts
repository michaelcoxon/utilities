import { Int16, Int32, Byte } from "./Integers";
import { Strings } from "./Strings";



/**
 * Represents a GUID
 */
export class Guid
{
    private readonly _a: Int32;
    private readonly _b: Int16;
    private readonly _c: Int16;
    private readonly _d: Byte;
    private readonly _e: Byte;
    private readonly _f: Byte;
    private readonly _g: Byte;
    private readonly _h: Byte;
    private readonly _i: Byte;
    private readonly _j: Byte;
    private readonly _k: Byte;

    constructor(a: Int32, b: Int16, c: Int16, d: Byte, e: Byte, f: Byte, g: Byte, h: Byte, i: Byte, j: Byte, k: Byte)
    {
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

    public toString(): string
    {
        return Strings.padLeft((this._a.valueOf() >>> 0).toString(16), 8, '0') + '-' +
            Strings.padLeft((this._b.valueOf() >>> 0).toString(16), 4, '0') + '-' +
            Strings.padLeft((this._c.valueOf() >>> 0).toString(16), 4, '0') + '-' +
            Strings.padLeft((this._d.valueOf() >>> 0).toString(16), 2, '0') +
            Strings.padLeft((this._e.valueOf() >>> 0).toString(16), 2, '0') + '-' +
            Strings.padLeft((this._f.valueOf() >>> 0).toString(16), 2, '0') +
            Strings.padLeft((this._g.valueOf() >>> 0).toString(16), 2, '0') +
            Strings.padLeft((this._h.valueOf() >>> 0).toString(16), 2, '0') +
            Strings.padLeft((this._i.valueOf() >>> 0).toString(16), 2, '0') +
            Strings.padLeft((this._j.valueOf() >>> 0).toString(16), 2, '0') +
            Strings.padLeft((this._k.valueOf() >>> 0).toString(16), 2, '0');
    }

    public valueOf(): string
    {
        return this.toString();
    }

    public static readonly empty: Guid = new Guid(
        new Int32(0),
        new Int16(0),
        new Int16(0),
        new Byte(0),
        new Byte(0),
        new Byte(0),
        new Byte(0),
        new Byte(0),
        new Byte(0),
        new Byte(0),
        new Byte(0));

    /** Creates a new v4 GUID */
    public static newGuid(): Guid
    {
        return new Guid(
            randomInt32(),
            randomInt16(),
            new Int16((randomInt16().valueOf() & 0x0FFF) | 0x4000),
            new Byte(randomByte().valueOf() | 0xA),
            randomByte(),
            randomByte(),
            randomByte(),
            randomByte(),
            randomByte(),
            randomByte(),
            randomByte());
    }

    public static parseString(str: string): Guid
    {
        const guid = str.replace(/[-\{\}\[\]]/gi, '');
        return new Guid(
            new Int32(parseInt(guid.slice(0, 8), 16)),
            new Int16(parseInt(guid.slice(8, 4), 16)),
            new Int16(parseInt(guid.slice(12, 4), 16)),
            new Byte(parseInt(guid.slice(16, 2), 16)),
            new Byte(parseInt(guid.slice(18, 2), 16)),
            new Byte(parseInt(guid.slice(20, 2), 16)),
            new Byte(parseInt(guid.slice(22, 2), 16)),
            new Byte(parseInt(guid.slice(24, 2), 16)),
            new Byte(parseInt(guid.slice(26, 2), 16)),
            new Byte(parseInt(guid.slice(28, 2), 16)),
            new Byte(parseInt(guid.slice(30, 2), 16)));
    }
}

function randomByte(): Byte
{
    return new Byte(Math.floor(Math.random() * Byte.maxValue.valueOf()) + Byte.minValue.valueOf())
}

function randomInt16(): Int16
{
    return new Int16(Math.floor(Math.random() * Int16.maxValue.valueOf()) + Int16.minValue.valueOf())
}

function randomInt32(): Int32
{
    return new Int32(Math.floor(Math.random() * Int32.maxValue.valueOf()) + Int32.minValue.valueOf())
}
import UnsignedInt32 from "./Integers/UnsignedInt32";
import UnsignedInt16 from "./Integers/UnsignedInt16";
import Byte from "./Integers/Byte";
import Strings from "./Strings";

/**
 * Represents a GUID
 */
export default class Guid
{
    private readonly _;
    private readonly _a: UnsignedInt32;
    private readonly _b: UnsignedInt16;
    private readonly _c: UnsignedInt16;
    private readonly _d: Byte;
    private readonly _e: Byte;
    private readonly _f: Byte;
    private readonly _g: Byte;
    private readonly _h: Byte;
    private readonly _i: Byte;
    private readonly _j: Byte;
    private readonly _k: Byte;

    /**
     * Creates a new Guid by specifying all the parts
     * @param a
     * @param b
     * @param c
     * @param d
     * @param e
     * @param f
     * @param g
     * @param h
     * @param i
     * @param j
     * @param k
     */
    constructor(a: UnsignedInt32, b: UnsignedInt16, c: UnsignedInt16, d: Byte, e: Byte, f: Byte, g: Byte, h: Byte, i: Byte, j: Byte, k: Byte)
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

    /** Returns the Guid as a hypen-separated string without curly braces. */
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

/** Returns the Guid as a hypen-separated string without curly braces. */
    public valueOf(): string
    {
        return this.toString();
    }

    /** An empty Guid (all zero's) */
    public static readonly empty: Guid = new Guid(
        new UnsignedInt32(0),
        new UnsignedInt16(0),
        new UnsignedInt16(0),
        new Byte(0),
        new Byte(0),
        new Byte(0),
        new Byte(0),
        new Byte(0),
        new Byte(0),
        new Byte(0),
        new Byte(0));

    /** Creates a new v4 GUID (its random except for the version nibble)*/
    public static newGuid(): Guid
    {
        return new Guid(
            randomInt32(),
            randomInt16(),
            new UnsignedInt16((randomInt16().valueOf() & 0x0FFF) | 0x4000),
            new Byte(randomByte().valueOf() | 0xA),
            randomByte(),
            randomByte(),
            randomByte(),
            randomByte(),
            randomByte(),
            randomByte(),
            randomByte());
    }

    /**
     * converts astring representaion of a Guid into a Guid object.
     * @param str
     */
    public static parseString(str: string): Guid
    {
        const guid = str.replace(/[-\{\}\[\]]/gi, '');
        return new Guid(
            new UnsignedInt32(parseInt(guid.substr(0, 8), 16)),
            new UnsignedInt16(parseInt(guid.substr(8, 4), 16)),
            new UnsignedInt16(parseInt(guid.substr(12, 4), 16)),
            new Byte(parseInt(guid.substr(16, 2), 16)),
            new Byte(parseInt(guid.substr(18, 2), 16)),
            new Byte(parseInt(guid.substr(20, 2), 16)),
            new Byte(parseInt(guid.substr(22, 2), 16)),
            new Byte(parseInt(guid.substr(24, 2), 16)),
            new Byte(parseInt(guid.substr(26, 2), 16)),
            new Byte(parseInt(guid.substr(28, 2), 16)),
            new Byte(parseInt(guid.substr(30, 2), 16)));
    }
}

function randomByte(): Byte
{
    return new Byte(randomNumber(Byte.minValue.valueOf(), Byte.maxValue.valueOf()));
}

function randomInt16(): UnsignedInt16
{
    return new UnsignedInt16(randomNumber(UnsignedInt16.minValue.valueOf(), UnsignedInt16.maxValue.valueOf()));
}

function randomInt32(): UnsignedInt32
{
    return new UnsignedInt32(randomNumber(UnsignedInt32.minValue.valueOf(), UnsignedInt32.maxValue.valueOf()));
}

function randomNumber(min: number, max: number): number
{
    let rand = Math.random();
    const num = Math.floor(rand * (max + 1)) + min;
    return num > max ? max : num;
}
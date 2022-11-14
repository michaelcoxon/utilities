import UnsignedInt32 from './Numbers/Integers/UnsignedInt32.js';
import UnsignedInt16 from './Numbers/Integers/UnsignedInt16.js';
import Byte from './Numbers/Integers/Byte.js';
import padLeft from './Strings/padLeft.js';
import StringBuilder from './IO/StringBuilder.js';

const PARSE_FILTER_REGEX = /[-{}[\]]/gi;

/**
 * Represents a GUID
 */
export default class Guid
{
    readonly #a: UnsignedInt32;
    readonly #b: UnsignedInt16;
    readonly #c: UnsignedInt16;
    readonly #d: Byte;
    readonly #e: Byte;
    readonly #f: Byte;
    readonly #g: Byte;
    readonly #h: Byte;
    readonly #i: Byte;
    readonly #j: Byte;
    readonly #k: Byte;

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
        this.#a = a;
        this.#b = b;
        this.#c = c;
        this.#d = d;
        this.#e = e;
        this.#f = f;
        this.#g = g;
        this.#h = h;
        this.#i = i;
        this.#j = j;
        this.#k = k;
    }

    /** Returns the Guid as a hypen-separated string without curly braces. */
    public toString(): string
    {
        const sb = new StringBuilder();
        const zero = '0';
        const spacer = '-'

        sb.append(padLeft((this.#a.valueOf() >>> 0).toString(16), 8, zero));
        sb.append(spacer);
        sb.append(padLeft((this.#b.valueOf() >>> 0).toString(16), 4, zero));
        sb.append(spacer);
        sb.append(padLeft((this.#c.valueOf() >>> 0).toString(16), 4, zero));
        sb.append(spacer);
        sb.append(padLeft((this.#d.valueOf() >>> 0).toString(16), 2, zero));
        sb.append(padLeft((this.#e.valueOf() >>> 0).toString(16), 2, zero));
        sb.append(spacer);
        sb.append(padLeft((this.#f.valueOf() >>> 0).toString(16), 2, zero));
        sb.append(padLeft((this.#g.valueOf() >>> 0).toString(16), 2, zero));
        sb.append(padLeft((this.#h.valueOf() >>> 0).toString(16), 2, zero));
        sb.append(padLeft((this.#i.valueOf() >>> 0).toString(16), 2, zero));
        sb.append(padLeft((this.#j.valueOf() >>> 0).toString(16), 2, zero));
        sb.append(padLeft((this.#k.valueOf() >>> 0).toString(16), 2, zero));

        return sb.toString();
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
        const guid = str.replace(PARSE_FILTER_REGEX, '');
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
// TODO: This can be better
function randomNumber(min: number, max: number): number
{
    const rand = Math.random();
    const num = Math.floor(rand * (max + 1)) + min;
    return num > max ? max : num;
}
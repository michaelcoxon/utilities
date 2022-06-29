import UnsignedInt32 from './Numbers/Integers/UnsignedInt32';
import UnsignedInt16 from './Numbers/Integers/UnsignedInt16';
import Byte from './Numbers/Integers/Byte';
import padLeft from './Strings/padLeft';
import StringBuilder from './IO/StringBuilder';
import crypto from 'crypto';
import { isString, isUndefinedOrNull } from './TypeHelpers';
import { empty } from './Strings';

const PARSE_FILTER_REGEX = /[-{}[\]]/gi;

/**
 * Represents a GUID
 */
export default class Guid extends String
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
     * Creates a new Guid from a string.
     * @param strGuid  like this: 123e4567-e89b-12d3-a456-426614174000
    */
    constructor(strGuid?: string)
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
    constructor(a?: UnsignedInt32, b?: UnsignedInt16, c?: UnsignedInt16, d?: Byte, e?: Byte, f?: Byte, g?: Byte, h?: Byte, i?: Byte, j?: Byte, k?: Byte)
    constructor(
        a?: UnsignedInt32 | string,
        b: UnsignedInt16 = UnsignedInt16.zero,
        c: UnsignedInt16 = UnsignedInt16.zero,
        d: Byte = Byte.zero,
        e: Byte = Byte.zero,
        f: Byte = Byte.zero,
        g: Byte = Byte.zero,
        h: Byte = Byte.zero,
        i: Byte = Byte.zero,
        j: Byte = Byte.zero,
        k: Byte = Byte.zero)
    {
        let stringValue = empty;
        if (isUndefinedOrNull(a))
        {
            a = UnsignedInt32.zero;
            stringValue = guidToString(a, b, c, d, e, f, g, h, i, j, k);
        }
        else if (isString(a))
        {
            stringValue = a;
            [a,b,c,d,e,f,g,h,i,j,k] = Guid.componentsParseString(stringValue);
        }
        else{
            stringValue = guidToString(a, b, c, d, e, f, g, h, i, j, k);
        }
        super(stringValue);
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

    // /** Returns the Guid as a hypen-separated string without curly braces. */
    // public valueOf()
    // {
    //     return this;
    // } 
    
    // /** Returns the Guid as a hypen-separated string without curly braces. */
    // public toString() {
    //     return this;        
    // }

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
    public static parseString(str: string ): Guid
    {
        return new Guid(str);
    }

    /**
     * converts astring representaion of a Guid into Guid componments.
     * @param str
     */
         public static componentsParseString(str: string):[a: UnsignedInt32,b: UnsignedInt16,c: UnsignedInt16,d: Byte,e: Byte,f: Byte,g: Byte,h: Byte,i: Byte,j: Byte,k: Byte]
 
         {
             const guid = str.replace(PARSE_FILTER_REGEX, '');
             return [
                 new UnsignedInt32(parseInt(guid.substring(0, 8), 16)),
                 new UnsignedInt16(parseInt(guid.substring(8, 12), 16)),
                 new UnsignedInt16(parseInt(guid.substring(12, 16), 16)),
                 new Byte(parseInt(guid.substring(16, 18), 16)),
                 new Byte(parseInt(guid.substring(18, 20), 16)),
                 new Byte(parseInt(guid.substring(20, 22), 16)),
                 new Byte(parseInt(guid.substring(22, 24), 16)),
                 new Byte(parseInt(guid.substring(24, 26), 16)),
                 new Byte(parseInt(guid.substring(26, 28), 16)),
                 new Byte(parseInt(guid.substring(28, 30), 16)),
                 new Byte(parseInt(guid.substring(30, 32), 16))
             ];
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
    return crytpoRandomNumber(min, max);
    // const rand = Math.random();
    // const num = Math.floor(rand * (max + 1)) + min;
    // return num > max ? max : num;
}

function crytpoRandomNumber(min: number, max: number): number
{
    // Create byte array and fill with 1 random number
    return crypto.randomInt(min, max);
}

/** Returns the Guid as a hypen-separated string without curly braces. */
function guidToString(
    a: UnsignedInt32 = UnsignedInt32.zero,
    b: UnsignedInt16 = UnsignedInt16.zero,
    c: UnsignedInt16 = UnsignedInt16.zero,
    d: Byte = Byte.zero,
    e: Byte = Byte.zero,
    f: Byte = Byte.zero,
    g: Byte = Byte.zero,
    h: Byte = Byte.zero,
    i: Byte = Byte.zero,
    j: Byte = Byte.zero,
    k: Byte = Byte.zero): string
{
    const sb = new StringBuilder();
    const zero = '0';
    const spacer = '-';

    sb.append(padLeft((a.valueOf() >>> 0).toString(16), 8, zero));
    sb.append(spacer);
    sb.append(padLeft((b.valueOf() >>> 0).toString(16), 4, zero));
    sb.append(spacer);
    sb.append(padLeft((c.valueOf() >>> 0).toString(16), 4, zero));
    sb.append(spacer);
    sb.append(padLeft((d.valueOf() >>> 0).toString(16), 2, zero));
    sb.append(padLeft((e.valueOf() >>> 0).toString(16), 2, zero));
    sb.append(spacer);
    sb.append(padLeft((f.valueOf() >>> 0).toString(16), 2, zero));
    sb.append(padLeft((g.valueOf() >>> 0).toString(16), 2, zero));
    sb.append(padLeft((h.valueOf() >>> 0).toString(16), 2, zero));
    sb.append(padLeft((i.valueOf() >>> 0).toString(16), 2, zero));
    sb.append(padLeft((j.valueOf() >>> 0).toString(16), 2, zero));
    sb.append(padLeft((k.valueOf() >>> 0).toString(16), 2, zero));

    return sb.toString();
}
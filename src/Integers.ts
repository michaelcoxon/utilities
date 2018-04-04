import { Exception, ArgumentException, OutOfBoundsException } from "./Exceptions";

export interface INumberValue
{
    valueOf(): number;
    toString(): string
}

export class Byte implements INumberValue
{
    /** The largest number that can be represented. Equal to 255. */
    public static readonly maxValue: number = 255;

    /** The closest number to zero that can be represented. Equal to 0. */
    public static readonly minValue: number = 0;

    private readonly _value: number;

    constructor(value: number)
    {
        ensureInt(value, 'Byte', Byte.minValue, Byte.maxValue);
        this._value = value;
    }

    public valueOf(): number
    {
        return this._value.valueOf() & 0xFF;
    }

    public toString(): string
    {
        return this._value.toString();
    }
}

export class Int16 implements INumberValue
{
    /** The largest number that can be represented. Equal to 32767. */
    public static readonly maxValue: number = 32767;

    /** The closest number to zero that can be represented. Equal to approximately -32768. */
    public static readonly minValue: number = -32768;

    private readonly _value: number;

    constructor(value: number)
    {
        ensureInt(value, 'Int16', Int16.minValue, Int16.maxValue);
        this._value = value;
    }

    public valueOf(): number
    {
        return this._value.valueOf() & 0xFFFF;
    }

    public toString(): string
    {
        return this._value.toString();
    }
}

export class Int32 implements INumberValue
{
    /** The largest number that can be represented. Equal to 2,147,483,647. */
    public static readonly maxValue: number = 2147483647;

    /** The closest number to zero that can be represented. Equal to -2,147,483,648. */
    public static readonly minValue: number = -2147483648;

    private readonly _value: number;

    constructor(value: number)
    {
        ensureInt(value, 'Int32', Int32.minValue, Int32.maxValue);
        this._value = value;
    }

    public valueOf(): number
    {
        return this._value.valueOf() & 0xFFFFFFFF;
    }

    public toString(): string
    {
        return this._value.toString();
    }
}

function ensureInt(value: number, name: string, minValue: number, maxValue: number): void
{
    if (!Number.isInteger(value))
    {
        throw new ArgumentException('value', `Value is not an ${name}`);
    }
    try
    {
        if (value > maxValue || value < minValue)
        {
            throw new ArgumentException('value', 'Value is out of bounds', new OutOfBoundsException('value', minValue, maxValue));
        }
    }
    catch (ex)
    {
        if (ex instanceof Exception)
        {
            throw new ArgumentException('value', ex.message, ex);
        }
        throw ex;
    }
}
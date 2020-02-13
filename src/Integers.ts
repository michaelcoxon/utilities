import { Exception, ArgumentException, OutOfBoundsException } from "./Exceptions";
import { IResult, Result } from "./Result";

export interface INumberValue
{
    valueOf(): number;
    toString(): string
}

export class Byte implements INumberValue
{
    /** The largest number that can be represented. Equal to 255. */
    public static readonly maxValue: number = 255;

    /** The lowest number that can be represented. Equal to 0. */
    public static readonly minValue: number = 0;

    private readonly _value: number;

    constructor(value: number)
    {
        ensureInt(value, Byte.minValue, Byte.maxValue);
        this._value = value;
    }

    public valueOf(): number
    {
        return this._value.valueOf() & 0xFF;
    }

    public toString(): string
    {
        return this.valueOf().toString();
    }

    public static parse(value: string): Byte
    {
        const int = parseInt(value);
        return new Byte(int);
    }

    public static tryParse(value: string): IResult<Byte>
    {
        const int = parseInt(value);
        try
        {
            ensureInt(int, Byte.minValue, Byte.maxValue);
            return Result.ok(new Byte(int));
        }
        catch (ex)
        {
            if (ex instanceof Exception)
            {
                return Result.fail(ex.message);
            }
            else if (ex instanceof Error)
            {
                return Result.fail(ex.message);
            }
            else
            {
                return Result.fail(ex);
            }
        }
    }
}

export class Int16 implements INumberValue
{
    /** The largest number that can be represented. Equal to 32767. */
    public static readonly maxValue: number = 32767;

    /** The lowest number that can be represented. Equal to -32768. */
    public static readonly minValue: number = -32768;

    private readonly _value: number;

    constructor(value: number)
    {
        ensureInt(value, Int16.minValue, Int16.maxValue);
        this._value = value;
    }

    public valueOf(): number
    {
        return this._value.valueOf() & 0xFFFF;
    }

    public toString(): string
    {
        return this.valueOf().toString();
    }

    public static parse(value: string): Int16
    {
        const int = parseInt(value);
        return new Int16(int);
    }

    public static tryParse(value: string): IResult<Int16>
    {
        const int = parseInt(value);
        try
        {
            ensureInt(int, Int16.minValue, Int16.maxValue);
            return Result.ok(new Int16(int));
        }
        catch (ex)
        {
            if (ex instanceof Exception)
            {
                return Result.fail(ex.message);
            }
            else if (ex instanceof Error)
            {
                return Result.fail(ex.message);
            }
            else
            {
                return Result.fail(ex);
            }
        }
    }
}

export class Int32 implements INumberValue
{
    /** The largest number that can be represented. Equal to 2,147,483,647. */
    public static readonly maxValue: number = 2147483647;

    /** The lowest number that can be represented. Equal to -2,147,483,648. */
    public static readonly minValue: number = -2147483648;

    private readonly _value: number;

    constructor(value: number)
    {
        ensureInt(value, Int32.minValue, Int32.maxValue);
        this._value = value;
    }

    public valueOf(): number
    {
        return this._value.valueOf() & 0xFFFFFFFF;
    }

    public toString(): string
    {
        return this.valueOf().toString();
    }

    public static parse(value: string): Int32
    {
        const int = parseInt(value);
        return new Int32(int);
    }

    public static tryParse(value: string): IResult<Int32>
    {
        const int = parseInt(value);
        try
        {
            ensureInt(int, Int32.minValue, Int32.maxValue);
            return Result.ok(new Int32(int));
        }
        catch (ex)
        {
            if (ex instanceof Exception)
            {
                return Result.fail(ex.message);
            }
            else if (ex instanceof Error)
            {
                return Result.fail(ex.message);
            }
            else
            {
                return Result.fail(ex);
            }
        }
    }
}

export class SignedByte implements INumberValue
{
    /** The largest number that can be represented. Equal to 127. */
    public static readonly maxValue: number = 127;

    /** The lowest number that can be represented. Equal to -127. */
    public static readonly minValue: number = -127;

    private readonly _value: number;

    constructor(value: number)
    {
        ensureInt(value, SignedByte.minValue, SignedByte.maxValue);
        this._value = value;
    }

    public valueOf(): number
    {
        return this._value.valueOf() & 0x7F;
    }

    public toString(): string
    {
        return this.valueOf().toString();
    }

    public static parse(value: string): SignedByte
    {
        const int = parseInt(value);
        return new SignedByte(int);
    }

    public static tryParse(value: string): IResult<SignedByte>
    {
        const int = parseInt(value);
        try
        {
            ensureInt(int, SignedByte.minValue, SignedByte.maxValue);
            return Result.ok(new SignedByte(int));
        }
        catch (ex)
        {
            if (ex instanceof Exception)
            {
                return Result.fail(ex.message);
            }
            else if (ex instanceof Error)
            {
                return Result.fail(ex.message);
            }
            else
            {
                return Result.fail(ex);
            }
        }
    }
}

export class UnsignedInt16 implements INumberValue
{
    /** The largest number that can be represented. Equal to 65,535. */
    public static readonly maxValue: number = 65535;

    /** The lowest number that can be represented. Equal to 0. */
    public static readonly minValue: number = 0;

    private readonly _value: number;

    constructor(value: number)
    {
        ensureInt(value, UnsignedInt16.minValue, UnsignedInt16.maxValue);
        this._value = value;
    }

    public valueOf(): number
    {
        return this._value.valueOf() & 0xFFFF;
    }

    public toString(): string
    {
        return this.valueOf().toString();
    }

    public static parse(value: string): UnsignedInt16
    {
        const int = parseInt(value);
        return new UnsignedInt16(int);
    }

    public static tryParse(value: string): IResult<UnsignedInt16>
    {
        const int = parseInt(value);
        try
        {
            ensureInt(int, UnsignedInt16.minValue, UnsignedInt16.maxValue);
            return Result.ok(new UnsignedInt16(int));
        }
        catch (ex)
        {
            if (ex instanceof Exception)
            {
                return Result.fail(ex.message);
            }
            else if (ex instanceof Error)
            {
                return Result.fail(ex.message);
            }
            else
            {
                return Result.fail(ex);
            }
        }
    }
}

export class UnsignedInt32 implements INumberValue
{
    /** The largest number that can be represented. Equal to 4,294,967,295. */
    public static readonly maxValue: number = 4294967295;

    /** The lowest number that can be represented. Equal to 0. */
    public static readonly minValue: number = 0;

    private readonly _value: number;

    constructor(value: number)
    {
        ensureInt(value, UnsignedInt32.minValue, UnsignedInt32.maxValue);
        this._value = value;
    }

    public valueOf(): number
    {
        return this._value.valueOf() & 0xFFFFFFFF;
    }

    public toString(): string
    {
        return this.valueOf().toString();
    }

    public static parse(value: string): UnsignedInt32
    {
        const int = parseInt(value);
        return new UnsignedInt32(int);
    }

    public static tryParse(value: string): IResult<UnsignedInt32>
    {
        const int = parseInt(value);
        try
        {
            ensureInt(int, UnsignedInt32.minValue, UnsignedInt32.maxValue);
            return Result.ok(new UnsignedInt32(int));
        }
        catch (ex)
        {
            if (ex instanceof Exception)
            {
                return Result.fail(ex.message);
            }
            else if (ex instanceof Error)
            {
                return Result.fail(ex.message);
            }
            else
            {
                return Result.fail(ex);
            }
        }
    }
}

function ensureInt(value: number, minValue: number, maxValue: number): void
{
    if (!NumberisInteger(value))
    {
        throw new ArgumentException('value', 'Value is not a whole number');
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

// HACK: adding this for now because of fucking IE
function NumberisInteger(value: number): boolean
{
    return Number.isInteger && Number.isInteger(value) || typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
};
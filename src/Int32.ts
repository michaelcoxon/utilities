import { ArgumentException } from ".";
import { Exception, OutOfBoundsException } from "./Exceptions";


export class Int32
{
    /** The largest number that can be represented. Equal to approximately 2,147,483,647. */
    public static readonly maxValue: Int32 = new Int32(2147483647);

    /** The closest number to zero that can be represented. Equal to approximately -2,147,483,648. */
    public static readonly minValue: Int32 = new Int32(- 2147483648);

    private readonly _value: number;

    constructor(value: number)
    {
        ensureInt32(value);
        this._value = value;
    }

    public valueOf(): number
    {
        return this._value.valueOf();
    }

    public toString(): string
    {
        return this._value.toString();
    }
}

function ensureInt32(value: number): void
{
    if (!Number.isInteger(value))
    {
        throw new ArgumentException('value', 'Value is not an integer');
    }
    try
    {
        if (value > Int32.maxValue.valueOf() || value < Int32.minValue.valueOf())
        {
            throw new ArgumentException('value', 'Value is out of bounds', new OutOfBoundsException('value', Int32.minValue.valueOf(), Int32.maxValue.valueOf()));
        }
    }
    catch (ex)
    {
        if (ex instanceof Exception)
        {
            throw new ArgumentException('value', ex.message, ex);
        }
        throw new ArgumentException('value');
    }
}
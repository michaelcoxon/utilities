import Exception from '../Exceptions/Exception';
import Result, { IResult } from "../Result";
import { INumberValue, ensureInt } from './_common';


export default class Int32 implements INumberValue
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

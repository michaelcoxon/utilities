import Exception from '../Exceptions/Exception';
import Result, { IResult } from "../Result";
import { INumberValue, ensureInt } from './_common';


export default class UnsignedInt32 implements INumberValue
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

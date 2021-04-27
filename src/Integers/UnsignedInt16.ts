import Exception from '../Exceptions/Exception';
import Result, { IResult } from "../Result";
import { INumberValue, ensureInt } from './_common';


export default class UnsignedInt16 implements INumberValue
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

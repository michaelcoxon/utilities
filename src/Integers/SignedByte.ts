import Exception from '../Exceptions/Exception';
import Result, { IResult } from "../Result";
import { INumberValue, ensureInt } from './_common';


export default class SignedByte implements INumberValue
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

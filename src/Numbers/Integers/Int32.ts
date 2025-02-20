import Exception from '../../Exceptions/Exception';
import { INumberValue } from './Integers.types';
import { ensureInt } from "../utils/ensureInt";
import Result from '../../Result/Result';
import { IResult } from '../../Result/_types';


export default class Int32 extends Number implements INumberValue
{
    /** The largest number that can be represented. Equal to 2,147,483,647. */
    public static readonly maxValue: number = 2147483647;

    /** The lowest number that can be represented. Equal to -2,147,483,648. */
    public static readonly minValue: number = -2147483648;

    readonly #value: number;

    constructor(value: number)
    {
        super(value);
        ensureInt(value, Int32.minValue, Int32.maxValue);
        this.#value = value;
    }

    [Symbol.toPrimitive](): number
    {
        return this.valueOf();
    }

    public valueOf(): number
    {
        const value = this.#value & 0xFFFFFFFF;
        return value > 0x7FFFFFFF ? value - 0x100000000 : value;
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
                return Result.fail(`${ex}`);
            }
        }
    }
}

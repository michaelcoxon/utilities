import Exception from '../../Exceptions/Exception.js';
import { INumberValue } from './Integers.types.js';
import ensureInt from "./ensureInt.js";
import { IResult } from '../../Result/_types.js';
import Result from '../../Result/Result.js';


export default class UnsignedInt32 extends Number implements INumberValue
{
    /** The largest number that can be represented. Equal to 4,294,967,295. */
    public static readonly maxValue: number = 4294967295;

    /** The lowest number that can be represented. Equal to 0. */
    public static readonly minValue: number = 0;

    readonly #value: number;

    constructor(value: number)
    {
        super(value);
        ensureInt(value, UnsignedInt32.minValue, UnsignedInt32.maxValue);
        this.#value = value;
    }

    [Symbol.toPrimitive](): number
    {
        return this.valueOf();
    }

    public valueOf(): number
    {
        return this.#value.valueOf() & 0xFFFFFFFF;
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
                return Result.fail(`${ex}`);
            }
        }
    }
}

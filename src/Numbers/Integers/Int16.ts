import Exception from '../../Exceptions/Exception.js';
import { INumberValue } from './Integers.types.js';
import  ensureInt  from "./ensureInt.js";
import Result from '../../Result/Result.js';
import { IResult } from '../../Result/_types.js';


export default class Int16 extends Number  implements INumberValue
{
    /** The largest number that can be represented. Equal to 32767. */
    public static readonly maxValue: number = 32767;

    /** The lowest number that can be represented. Equal to -32768. */
    public static readonly minValue: number = -32768;

    readonly #value: number;

    constructor(value: number)
    {
        super(value);
        ensureInt(value, Int16.minValue, Int16.maxValue);
        this.#value = value;
    }
    
    [Symbol.toPrimitive](): number
    {
        return this.valueOf();
    }

    public valueOf(): number
    {
        return this.#value.valueOf() & 0xFFFF;
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
                return Result.fail(`${ex}`);
            }
        }
    }
}

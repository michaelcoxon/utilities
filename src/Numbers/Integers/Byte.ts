import Exception from '../../Exceptions/Exception';
import Result, { IResult } from "../../Result";
import { INumberValue } from './Integers.types';
import { ensureInt } from "./ensureInt";

/**
 * Represents an unsigned 8-bit integer. 
 */
export default class Byte extends Number  implements INumberValue
{
    /** The largest number that can be represented. Equal to 255. */
    public static readonly maxValue: number = 255;

    /** The lowest number that can be represented. Equal to 0. */
    public static readonly minValue: number = 0;

    readonly #value: number;

    constructor(value: number)
    {
        super(value);
        ensureInt(value, Byte.minValue, Byte.maxValue);
        this.#value = value;
    }
        
    [Symbol.toPrimitive](): number
    {
        return this.valueOf();
    }

    public valueOf(): number
    {
        return this.#value.valueOf() & 0xFF;
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
                return Result.fail(`${ex}`);
            }
        }
    }
}

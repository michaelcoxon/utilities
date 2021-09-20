import Exception from '../../Exceptions/Exception';
import Result, { IResult } from "../../Result";
import { INumberValue } from './Integers.types';
import { ensureInt } from "./ensureInt";


export default class UnsignedInt16  extends Number implements INumberValue
{
    /** The largest number that can be represented. Equal to 65,535. */
    public static readonly maxValue: number = 65535;

    /** The lowest number that can be represented. Equal to 0. */
    public static readonly minValue: number = 0;

    readonly #value: number;

    constructor(value: number)
    {
        super(value);
        ensureInt(value, UnsignedInt16.minValue, UnsignedInt16.maxValue);
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
                return Result.fail(`${ex}`);
            }
        }
    }
}

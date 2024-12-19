import Exception from '../../Exceptions/Exception';
import { INumberValue } from './Integers.types';
import { ensureInt } from "../utils/ensureInt";
import Result from '../../Result/Result';
import { IResult } from '../../Result/_types';


export default class SignedByte extends Number implements INumberValue
{
    /** The largest number that can be represented. Equal to 127. */
    public static readonly maxValue: number = 127;

    /** The lowest number that can be represented. Equal to -128. */
    public static readonly minValue: number = -128;

    readonly #value: number;

    constructor(value: number)
    {
        super(value);
        ensureInt(value, SignedByte.minValue, SignedByte.maxValue);
        this.#value = value;
    }

    [Symbol.toPrimitive](): number
    {
        return this.valueOf();
    }

    public valueOf(): number
    {
        // return this.#value.valueOf() & 0x7F;
        const value = this.#value.valueOf() & 0xFF;
        return value > 0x7F ? value - 0x100 : value;
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
                return Result.fail(`${ex}`);
            }
        }
    }
}

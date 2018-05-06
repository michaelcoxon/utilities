import * as Integers from "./Integers";




export namespace Numbers
{
    export function toByte(value: number): Integers.Byte
    {
        return new Integers.Byte(value);
    }

    export function toInt16(value: number): Integers.Int16
    {
        return new Integers.Int16(value);
    }

    export function toInt32(value: number): Integers.Int32
    {
        return new Integers.Int32(value);
    }

    export function toSignedByte(value: number): Integers.SignedByte
    {
        return new Integers.SignedByte(value);
    }

    export function toUnsignedInt16(value: number): Integers.UnsignedInt16
    {
        return new Integers.UnsignedInt16(value);
    }

    export function toUnsignedInt32(value: number): Integers.UnsignedInt32
    {
        return new Integers.UnsignedInt32(value);
    }

    export function isMultipleOf(value: number, multiple: number): boolean
    {
        return (value % multiple) === 0;
    }

    export function isEven(value: number): boolean
    {
        return isMultipleOf(value, 2);
    }

    export function isOdd(value: number): boolean
    {
        return !isEven(value);
    }
}

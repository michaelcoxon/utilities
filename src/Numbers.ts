import Byte from './Integers/Byte';
import Int16 from './Integers/Int16';
import Int32 from './Integers/Int32';
import SignedByte from './Integers/SignedByte';
import UnsignedInt16 from './Integers/UnsignedInt16';
import UnsignedInt32 from './Integers/UnsignedInt32';

namespace Numbers
{
    export function toByte(value: number): Byte
    {
        return new Byte(value);
    }

    export function toInt16(value: number): Int16
    {
        return new Int16(value);
    }

    export function toInt32(value: number): Int32
    {
        return new Int32(value);
    }

    export function toSignedByte(value: number): SignedByte
    {
        return new SignedByte(value);
    }

    export function toUnsignedInt16(value: number): UnsignedInt16
    {
        return new UnsignedInt16(value);
    }

    export function toUnsignedInt32(value: number): UnsignedInt32
    {
        return new UnsignedInt32(value);
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
export default Numbers;


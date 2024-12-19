import { randomInt } from 'crypto';
import { isUndefinedOrNull } from '../../TypeHelpers';
import Byte from './Byte';
import Int16 from './Int16';
import Int32 from './Int32';
import { INumberValue } from './Integers.types';
import SignedByte from './SignedByte';
import UnsignedInt16 from './UnsignedInt16';
import UnsignedInt32 from './UnsignedInt32';

function test(value: INumberValue, minValue?: number, maxValue?: number): void
{
    if (!isUndefinedOrNull(minValue) && value.valueOf() < minValue)
    {
        throw `below minimum. ${value.valueOf()} < ${minValue}`;
    }
    if (!isUndefinedOrNull(maxValue) && value.valueOf() > maxValue)
    {
        throw `above maximum. ${value.valueOf()} > ${maxValue}`;
    }
}

describe("Byte", () =>
{
    it("Byte is in range", () =>
    {
        const min = new Byte(0);
        const max = new Byte(255);

        test(min, Byte.minValue, Byte.maxValue);
        test(max, Byte.minValue, Byte.maxValue);
    });

    it("Byte is correct value", () =>
    {
        for (let value = Byte.minValue; value <= Byte.maxValue; value++)
        {
            const actual = new Byte(value);
            expect(actual.valueOf()).toBe(value);
        }
    });

    it("Byte is correct string", () =>
    {
        for (let value = Byte.minValue; value <= Byte.maxValue; value++)
        {
            const actual = new Byte(value);
            expect(actual.toString()).toBe(value.toString());
        }
    });
});

describe("SignedByte", () =>
{
    it("SignedByte is in range", () =>
    {
        const min = new SignedByte(-128);
        const max = new SignedByte(127);

        test(min, SignedByte.minValue, SignedByte.maxValue);
        test(max, SignedByte.minValue, SignedByte.maxValue);
    });

    it("SignedByte is correct value", () =>
    {
        for (let value = SignedByte.minValue; value <= SignedByte.maxValue; value++)
        {
            const actual = new SignedByte(value);
            expect(actual.valueOf()).toBe(value);
        }
    });

    it("SignedByte is correct string", () =>
    {
        for (let value = SignedByte.minValue; value <= SignedByte.maxValue; value++)
        {
            const actual = new SignedByte(value);
            expect(actual.toString()).toBe(value.toString());
        }
    });
});


describe("Int16", () =>
{
    it("Int16 is in range", () =>
    {
        const min = new Int16(-32768);
        const max = new Int16(32767);

        test(min, Int16.minValue, Int16.maxValue);
        test(max, Int16.minValue, Int16.maxValue);
    });

    it("Int16 is correct value", () =>
    {
        for (let value = Int16.minValue; value <= Int16.maxValue; value++)
        {
            const actual = new Int16(value);
            expect(actual.valueOf()).toBe(value);
        }
    });

    it("Int16 is correct string", () =>
    {
        for (let value = Int16.minValue; value <= Int16.maxValue; value++)
        {
            const actual = new Int16(value);
            expect(actual.toString()).toBe(value.toString());
        }
    });
});

describe("Int32", () =>
{
    it("Int32 is in range", () =>
    {
        const min = new Int32(-2147483648);
        const max = new Int32(2147483647);

        test(min, Int32.minValue, Int32.maxValue);
        test(max, Int32.minValue, Int32.maxValue);
    });

    it("Int32 is correct value", () =>
    {
        const value = randomInt(Int32.minValue, Int32.maxValue);
        const actual = new Int32(value);

        expect(actual.valueOf()).toBe(value);
    });

    it("Int32 is correct string", () =>
    {
        const value = randomInt(Int32.minValue, Int32.maxValue);
        const actual = new Int32(value);

        expect(actual.toString()).toBe(value.toString());
    });
});

describe("UnsignedInt16", () =>
{
    it("UnsignedInt16 is in range", () =>
    {
        const min = new UnsignedInt16(0);
        const max = new UnsignedInt16(65535);

        test(min, UnsignedInt16.minValue, UnsignedInt16.maxValue);
        test(max, UnsignedInt16.minValue, UnsignedInt16.maxValue);
    });

    it("UnsignedInt16 is correct value", () =>
    {
        for (let value = UnsignedInt16.minValue; value <= UnsignedInt16.maxValue; value++)
        {
            const actual = new UnsignedInt16(value);
            expect(actual.valueOf()).toBe(value);
        }
    });

    it("UnsignedInt16 is correct string", () =>
    {
        for (let value = UnsignedInt16.minValue; value <= UnsignedInt16.maxValue; value++)
        {
            const actual = new UnsignedInt16(value);
            expect(actual.toString()).toBe(value.toString());
        }
    });
});

describe("UnsignedInt32", () =>
{
    it("UnsignedInt32 is in range", () =>
    {
        const min = new UnsignedInt32(0);
        const max = new UnsignedInt32(4294967295);

        test(min, UnsignedInt32.minValue, UnsignedInt32.maxValue);
        test(max, UnsignedInt32.minValue, UnsignedInt32.maxValue);
    });

    it("UnsignedInt32 is correct value", () =>
    {
        const value = randomInt(UnsignedInt32.minValue, UnsignedInt32.maxValue);
        const actual = new UnsignedInt32(value);

        expect(actual.valueOf()).toBe(value);
    });

    it("UnsignedInt32 is 2837748788", () =>
    {
        const value = 2837748788;
        const actual = new UnsignedInt32(value);

        expect(actual.valueOf()).toBe(value);
    });

    it("UnsignedInt32 is correct string", () =>
    {
        const value = randomInt(UnsignedInt32.minValue, UnsignedInt32.maxValue);
        const actual = new UnsignedInt32(value);

        expect(actual.toString()).toBe(value.toString());
    });
});
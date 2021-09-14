import { Byte, INumberValue } from '../../src';

describe("Integers.MinMax", () => {
    function test(value: INumberValue, minValue?: number, maxValue?: number) {
        if (minValue && value.valueOf() < minValue)
        {
            fail("below minimum");
        }
        if (maxValue && value.valueOf() > maxValue) {
            fail("above maximum");
        }
    }

    it("Byte is in range", () => {
        const b0 = new Byte(0);
        const b255 = new Byte(255);

        test(b0, Byte.minValue, Byte.maxValue);
        test(b255, Byte.minValue, Byte.maxValue);
    });
});
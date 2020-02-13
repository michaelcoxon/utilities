import { Byte, Int16, Int32, SignedByte, UnsignedInt16, UnsignedInt32, INumberValue } from '../src/Integers';
import { expect, assert } from 'chai';
import 'mocha';
import { ConstructorFor } from '../src/Types';


describe("Integers.MinMax", () => {
    function test(value: INumberValue, minValue?: number, maxValue?: number) {
        if (minValue && value.valueOf() < minValue)
        {
            assert.fail("below minimum");
        }
        if (maxValue && value.valueOf() > maxValue) {
            assert.fail("above maximum");
        }
    }

    it("Byte is in range", () => {
        const b0 = new Byte(0);
        const b255 = new Byte(255);

        test(b0, Byte.minValue, Byte.maxValue);
        test(b255, Byte.minValue, Byte.maxValue);
    });
});
``
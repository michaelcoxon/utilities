import { INumberValue } from '../src/Integers/_common';
import UnsignedInt32 from "../src/Integers/UnsignedInt32";
import UnsignedInt16 from "../src/Integers/UnsignedInt16";
import SignedByte from "../src/Integers/SignedByte";
import Int32 from "../src/Integers/Int32";
import Int16 from "../src/Integers/Int16";
import Byte from "../src/Integers/Byte";
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
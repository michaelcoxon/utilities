import { expect, assert } from 'chai';
import 'mocha';
import { slowtest } from './_env';

import { Booleans} from '../src/Booleans';


describe("Booleans consts", () =>
{
    it("trueString", () =>
    {
        const actual = Booleans.trueString;
        const expected = true.toString();

        expect(expected).to.equal(actual);
    });

    it("falseString", () =>
    {
        const actual = Booleans.falseString;
        const expected = false.toString();

        expect(expected).to.equal(actual);
    });
});
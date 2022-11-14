import { falseString, trueString } from './Booleans/_consts.js';


describe("Booleans consts", () =>
{
    it("trueString", () =>
    {
        const actual = trueString;
        const expected = true.toString();

        expect(actual).toEqual(expected);
    });

    it("falseString", () =>
    {
        const actual = falseString;
        const expected = false.toString();

        expect(actual).toEqual(expected);
    });
});
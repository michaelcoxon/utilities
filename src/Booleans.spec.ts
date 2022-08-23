import { falseString, trueString } from '../src/Booleans/_consts';


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
import Booleans from '../src/Booleans';


describe("Booleans consts", () =>
{
    it("trueString", () =>
    {
        const actual = Booleans.trueString;
        const expected = true.toString();

        expect(actual).toEqual(expected);
    });

    it("falseString", () =>
    {
        const actual = Booleans.falseString;
        const expected = false.toString();

        expect(actual).toEqual(expected);
    });
});
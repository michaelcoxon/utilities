import sum from './sum.js';

describe("sum", () =>
{
    it("should return 10", () =>
    {
        const expected = 10;
        const actual = sum([1, 9]);
        expect(actual).toEqual(expected);
    });
});

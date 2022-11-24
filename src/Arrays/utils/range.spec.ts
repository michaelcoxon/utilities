import range from './range';

describe("range", () =>
{
    it("should return an array from 0 to 9", () =>
    {
        const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const actual = range(0, 10);
        expect(actual).toEqual(expected);
    });
});

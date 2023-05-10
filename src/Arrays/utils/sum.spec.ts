import sum from './sum';

describe("sum", () =>
{
    it("should return 10", () =>
    {
        const expected = 10;
        const actual = sum([1, 9]);
        expect(actual).toEqual(expected);
    });
    
    it("should return the sum of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = sum(query, (i) => i);

        expect(10).toEqual(result);
    });
});
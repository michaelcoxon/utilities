import select from './select';

describe("select", () =>
{
    it("should return a map of the set 1", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;
        const expected = [1, 2, 3, 4];

        const result = select(query, (i) => i);

        for (let i = 0; i < result.length; i++)
        {
            expect(result[i]).toEqual(expected[i]);
        }
    });

    it("should return a map of the set 2", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;
        const expected = [2, 4, 6, 8];

        const result = select(query, (i) => i * 2);

        for (let i = 0; i < result.length; i++)
        {
            expect(expected[i]).toEqual(result[i]);
        }
    });
});

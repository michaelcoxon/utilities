import selectMany from './selectMany';

describe("selectMany", () =>
{
    it("should return a flat map of the set 1", () =>
    {
        const array = [[1], [2], [3], [4]];
        const query = array;
        const expected = [1, 2, 3, 4];

        const result = selectMany(query, i => i);

        for (let i = 0; i < result.length; i++)
        {
            expect(result[i]).toEqual(expected[i]);
        }
    });

    it("should return a flat map of the set 1.2", () =>
    {
        const array = [new Array([1, 2, 3]), new Array([4, 5])];
        const query = array;
        const expected = [1, 2, 3, 4, 5];

        const result = selectMany(query, i => selectMany(i, i1 => i1));

        for (let i = 0; i < result.length; i++)
        {
            expect(result[i]).toEqual(expected[i]);
        }
    });

    it("should return a flat map of the set 2", () =>
    {
        const array = [[1, 2], [2, 3], [3, 4], [4, 5]];
        const query = array;
        const expected = [1, 2, 2, 3, 3, 4, 4, 5];

        const result = selectMany(query, i => i);

        for (let i = 0; i < result.length; i++)
        {
            expect(expected[i]).toEqual(result[i]);
        }
    });

});

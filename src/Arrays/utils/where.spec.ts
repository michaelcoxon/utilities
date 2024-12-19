import where from './where';

describe("where", () =>
{
    it("should return the items that match the predicate", () =>
    {
        const array = [1, 2, 3, 4];

        const result = where(array, (i) => i % 2 == 0);

        expect(result.length).toEqual(2);

        expect(result[0]).toEqual(2);
        expect(result[1]).toEqual(4);
    });
});
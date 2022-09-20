import getHash from './getHash';

describe("getHash", () =>
{
    it("should get the hash of the object", () =>
    {
        const a = { a: 1 };
        const actual = getHash(a);
        expect(actual).not.toBeNull();
        expect(actual.length).not.toEqual(0);
    });

    it("should have the same hash", () =>
    {
        const a = { a: 1 };
        const b = { a: 1 };

        expect(getHash(a)).toEqual(getHash(b));
    });
});
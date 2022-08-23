import createSelector from '../src/Utilities/createSelector';
import equals from '../src/Utilities/equals';
import getHash from '../src/Utilities/getHash';

describe("Utilities.createSelector.string", () =>
{
    it("should create a selector using the key of the object as a string", () =>
    {
        const a = { a: 1 };
        const actual = createSelector<typeof a>('a');
        expect(actual(a)).toEqual(1);
    });

    it("should create a selector using the key of the object as a string (1)", () =>
    {
        const a = { a: 1, b: 2 };
        {
            const actual = createSelector<typeof a>('a');
            expect(actual(a)).toEqual(1);
        }
        {
            const actual = createSelector<typeof a>('b');
            expect(actual(a)).toEqual(2);
        }

    });
});

describe("Utilities.createSelector.Selector", () =>
{
    it("should create a selector using the key of the object as a string", () =>
    {
        const a = { a: 1 };
        const actual = createSelector<typeof a, number>(item => item.a);
        expect(actual(a)).toEqual(1);
    });

    it("should create a selector using the key of the object as a string (1)", () =>
    {
        const a = { a: 1, b: 2 };
        {
            const actual = createSelector<typeof a, number>(item => item.a);
            expect(actual(a)).toEqual(1);
        }
        {
            const actual = createSelector<typeof a, number>(item => item.b);
            expect(actual(a)).toEqual(2);
        }
    });
});

describe("Utilities.equals", () =>
{
    it("should equal the same value object", () =>
    {
        const a = { a: 1 };
        const b = { a: 1 };

        expect(equals(a, b));
    });

    it("should equal the same value object with json", () =>
    {
        const a = {};
        const b = {};

        expect(equals(a, b, true));
    });

    it("should equal the same value object with json & deep", () =>
    {
        const a = { a: {} };
        const b = { a: {} };

        expect(equals(a, b, true, true));
    });

    it("should equal the same value object without json & with deep", () =>
    {
        const a = { a: 1 };
        const b = { a: 1 };

        expect(equals(a, b, false, true));
    });
});

describe("Utilities.getHash", () =>
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
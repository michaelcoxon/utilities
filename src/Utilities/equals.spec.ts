import equals from './equals';

describe("equals", () =>
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

import isBoolean from './isBoolean';

describe("isBoolean", () =>
{
    it("should return true if the value is true", () =>
    {
        expect(isBoolean(true)).toBe(true);
    });

    it("should return true if the value is false", () =>
    {
        expect(isBoolean(false)).toBe(true);
    });

    it("should return false if the value is 1", () =>
    {
        expect(isBoolean(1)).toBe(false);
    });

    it("should return false if the value is 'a'", () =>
    {
        expect(isBoolean('a')).toBe(false);
    });

    it("should return false if the value is {}", () =>
    {
        expect(isBoolean({})).toBe(false);
    });

    it("should return false if the value is { a: 'a'}", () =>
    {
        expect(isBoolean({ a: 'a' })).toBe(false);
    });

    it("should return false if the value is null", () =>
    {
        expect(isBoolean(null)).toBe(false);
    });

    it("should return false if the value is undefined", () =>
    {
        expect(isBoolean(undefined)).toBe(false);
    });
});
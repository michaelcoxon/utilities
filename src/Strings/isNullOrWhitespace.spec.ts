import isNullOrWhitespace from './isNullOrWhitespace';

describe("isNullOrWhitespace", () =>
{
    it("should return true if the string is undefined", () =>
    {
        expect(isNullOrWhitespace()).toEqual(true);
    });

    it("should return true if the string is null", () =>
    {
        expect(isNullOrWhitespace(null)).toEqual(true);
    });

    it("should return true if the string is whitespace", () =>
    {
        expect(isNullOrWhitespace('   ')).toEqual(true);
    });

    it("should return false if the string is empty", () =>
    {
        expect(isNullOrWhitespace('')).toEqual(false);
    });

    it("should return false if the string is valid", () =>
    {
        expect(isNullOrWhitespace('a')).toEqual(false);
    });
});

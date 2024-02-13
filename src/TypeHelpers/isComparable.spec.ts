import isComparable from './isComparable';


describe("isComparable", () =>
{
    it("should return true if the value is true", () =>
    {
        expect(isComparable(true)).toBe(true);
    });

    it("should return true if the value is false", () =>
    {
        expect(isComparable(false)).toBe(true);
    });

    it("should return true if the value is 1", () =>
    {
        expect(isComparable(1)).toBe(true);
    });

    it("should return true if the value is 'a'", () =>
    {
        expect(isComparable('a')).toBe(true);
    });

    it("should return true if the value is []", () =>
    {
        expect(isComparable([])).toBe(true);
    });

    it("should return false if the value is [2,3,4,5]", () =>
    {
        expect(isComparable([2, 3, 4, 5])).toBe(false);
    });

    it("should return false if the value is {}", () =>
    {
        expect(isComparable({})).toBe(false);
    });
});
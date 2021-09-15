import { isNullOrEmpty } from '../../src';

describe("isNullOrEmpty", () =>
{
    it("should return true if the value is undefined", () =>
    {
        expect(isNullOrEmpty()).toEqual(true);
    });

    it("should return true if the value is null", () =>
    {
        expect(isNullOrEmpty(null)).toEqual(true);
    });
});

describe("isNullOrEmpty (String)", () =>
{
    it("should return true if the string is empty", () =>
    {
        expect(isNullOrEmpty('')).toEqual(true);
    });

    it("should return false if the string is valid", () =>
    {
        expect(isNullOrEmpty('a')).toEqual(false);
    });
});

describe("isNullOrEmpty (Array)", () =>
{
    it("should return true if the array is empty", () =>
    {
        expect(isNullOrEmpty([])).toEqual(true);
    });

    it("should return false if the array is valid", () =>
    {
        expect(isNullOrEmpty(['a'])).toEqual(false);
    });
});
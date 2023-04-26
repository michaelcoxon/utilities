import List  from '../Enumerables/List';
import isNullOrEmpty from '../../src/TypeHelpers/isNullOrEmpty';

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

describe("isNullOrEmpty (Enumerable)", () =>
{
    it("should return true if the Enumerable is empty", () =>
    {
        expect(isNullOrEmpty(new List())).toEqual(true);
    });

    it("should return false if the Enumerable is valid", () =>
    {
        expect(isNullOrEmpty(new List(['a']))).toEqual(false);
    });
});
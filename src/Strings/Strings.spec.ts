import { empty } from './_consts';
import format from './format';
import trim from './trim';
import trimStart from './trimStart';
import trimEnd from './trimEnd';
import isNullOrWhitespace from './isNullOrWhitespace';
import toCharArray from './toCharArray';

describe("String.empty", () =>
{
    it("should return an empty string", () =>
    {
        expect(empty).toEqual('');
    });
});


describe("String.format", () =>
{
    it("should format the string", () =>
    {
        const s_format = "The subject was '{0}'";
        const subject = "sample";

        const expected = "The subject was 'sample'";
        const actual = format(s_format, subject);

        expect(actual).toEqual(expected);
    });

    it("should format the string in order", () =>
    {
        const s_format = "{0}, {1}, {2} and {3}";
        const args = [4, 5, 6, 7];

        const expected = "4, 5, 6 and 7";
        const actual = format(s_format, ...args);

        expect(actual).toEqual(expected);
    });

    it("should format the string in a different order", () =>
    {
        const s_format = "{0}, {2}, {1} and {3}";
        const args = [4, 6, 5, 7];

        const expected = "4, 5, 6 and 7";
        const actual = format(s_format, ...args);

        expect(actual).toEqual(expected);
    });

    it("should format a date 'yyyy-MM-dd HH:mm:ss.fff'", () =>
    {
        const s_format = "{0:yyyy-MM-dd HH:mm:ss.fff}";
        const date = new Date("July 20, 1972 02:20:18");

        const expected = "1972-07-20 02:20:18.000";
        const actual = format(s_format, date);

        expect(actual).toEqual(expected);
    });

    it("should format a date 'MMMM' for August", () =>
    {
        const s_format = "{0:MMMM}";
        const date = new Date("2019-08-26");

        const expected = "August";
        const actual = format(s_format, date);

        expect(actual).toEqual(expected);
    });

    it("should format the number as currency", () =>
    {
        const s_format = "{0:c}";
        const subject = 123.456;

        const expected = "$123.46";
        const actual = format(s_format, subject);

        expect(actual).toEqual(expected);
    });

    it("should format the number as currency negative", () =>
    {
        const s_format = "{0:c}";
        const subject = -123.456;

        const expected = "-$123.46";
        const actual = format(s_format, subject);

        expect(actual).toEqual(expected);
    });

    it("should format the number as decimal", () =>
    {
        const s_format = "{0:d}";
        const subject = 123.456;

        const expected = "123";
        const actual = format(s_format, subject);

        expect(actual).toEqual(expected);
    });

    it("should format the number as decimal negative", () =>
    {
        const s_format = "{0:d}";
        const subject = -123.456;

        const expected = "-123";
        const actual = format(s_format, subject);

        expect(actual).toEqual(expected);
    });

    it("should format the number as fixed", () =>
    {
        const s_format = "{0:f2}";
        const subject = 123.456;

        const expected = "123.46";
        const actual = format(s_format, subject);

        expect(actual).toEqual(expected);
    });

    it("should format the number as fixed negative", () =>
    {
        const s_format = "{0:f2}";
        const subject = -123.456;

        const expected = "-123.46";
        const actual = format(s_format, subject);

        expect(actual).toEqual(expected);
    });
});

describe("String.trim", () =>
{
    it("should return a string with the whitespace on the start and end removed", () =>
    {
        const subject = "   asdf      ";
        const expected = "asdf";
        const actual = trim(subject);

        expect(actual).toEqual(expected);
    });

    it("should return a string with the characters on the start and end removed", () =>
    {
        const subject = ".,.,asdf.,.,.,.";
        const expected = "asdf";
        const actual = trim(subject, '.,');

        expect(actual).toEqual(expected);
    });
});

describe("String.trimStart", () =>
{
    it("should return a string with the whitespace on the start and end removed", () =>
    {
        const subject = "   asdf      ";
        const expected = "asdf      ";
        const actual = trimStart(subject);

        expect(actual).toEqual(expected);
    });

    it("should return a string with the characters on the start and end removed", () =>
    {
        const subject = ".,.,asdf.,.,.,.";
        const expected = "asdf.,.,.,.";
        const actual = trimStart(subject, '.,');

        expect(actual).toEqual(expected);
    });
});


describe("String.trimEnd", () =>
{
    it("should return a string with the whitespace on the start and end removed", () =>
    {
        const subject = "   asdf      ";
        const expected = "   asdf";
        const actual = trimEnd(subject);

        expect(actual).toEqual(expected);
    });

    it("should return a string with the characters on the start and end removed", () =>
    {
        const subject = ".,.,asdf.,.,.,.";
        const expected = ".,.,asdf";
        const actual = trimEnd(subject, '.,');

        expect(actual).toEqual(expected);
    });
});


describe("String.isNullOrWhitespace", () =>
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

describe("String.toCharArray", () =>
{
    it("should return an array with all characters", () =>
    {
        expect(toCharArray('1234')).toEqual(['1', '2', '3', '4'])
        //assert.sameOrderedMembers(toCharArray('1234'), ['1', '2', '3', '4']);
    });

    it("should return an empty array if the string is empty", () =>
    {
        expect(toCharArray('')).toEqual([])
        //assert.sameOrderedMembers(toCharArray(''), []);
    });
});

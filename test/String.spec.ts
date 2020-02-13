import { Strings } from '../src/Strings';
import { expect, assert } from 'chai';
import 'mocha';


describe("String.empty", () =>
{
    it("should return an empty string", () =>
    {
        assert.equal(Strings.empty, '');
    });
});


describe("String.format", () =>
{
    it("should format the string", () =>
    {
        const format = "The subject was '{0}'";
        const subject = "sample";

        let expect = "The subject was 'sample'";
        let actual = Strings.format(format, subject);

        assert.equal(actual, expect);
    });

    it("should format the string in order", () =>
    {
        const format = "{0}, {1}, {2} and {3}";
        const args = [4, 5, 6, 7];

        let expect = "4, 5, 6 and 7";
        let actual = Strings.format(format, ...args);

        assert.equal(actual, expect);
    });

    it("should format the string in a different order", () =>
    {
        const format = "{0}, {2}, {1} and {3}";
        const args = [4, 6, 5, 7];

        let expect = "4, 5, 6 and 7";
        let actual = Strings.format(format, ...args);

        assert.equal(actual, expect);
    });

    it("should format a date 'yyyy-MM-dd HH:mm:ss\.fff'", () =>
    {
        const format = "{0:yyyy-MM-dd HH:mm:ss.fff}";
        const date = new Date("July 20, 1972 02:20:18");

        console.log(date);

        const expect = "1972-07-20 02:20:18.000";
        const actual = Strings.format(format, date);

        assert.equal(actual, expect);
    });

    it("should format a date 'MMMM' for August", () =>
    {
        const format = "{0:MMMM}";
        const date = new Date("2019-08-26");

        console.log(date);

        const expect = "August";
        const actual = Strings.format(format, date);

        assert.equal(actual, expect);
    });

    it("should format the number as currency", () =>
    {
        const format = "{0:c}";
        const subject = 123.456;

        let expect = "$123.46";
        let actual = Strings.format(format, subject);

        assert.equal(actual, expect);
    });

    it("should format the number as currency negative", () =>
    {
        const format = "{0:c}";
        const subject = -123.456;

        let expect = "-$123.46";
        let actual = Strings.format(format, subject);

        assert.equal(actual, expect);
    });

    it("should format the number as decimal", () =>
    {
        const format = "{0:d}";
        const subject = 123.456;

        let expect = "123";
        let actual = Strings.format(format, subject);

        assert.equal(actual, expect);
    });

    it("should format the number as decimal negative", () =>
    {
        const format = "{0:d}";
        const subject = -123.456;

        let expect = "-123";
        let actual = Strings.format(format, subject);

        assert.equal(actual, expect);
    });

    it("should format the number as fixed", () =>
    {
        const format = "{0:f2}";
        const subject = 123.456;

        let expect = "123.46";
        let actual = Strings.format(format, subject);

        assert.equal(actual, expect);
    });

    it("should format the number as fixed negative", () =>
    {
        const format = "{0:f2}";
        const subject = -123.456;

        let expect = "-123.46";
        let actual = Strings.format(format, subject);

        assert.equal(actual, expect);
    });
});

describe("String.trim", () =>
{
    it("should return a string with the whitespace on the start and end removed", () =>
    {
        const subject = "   asdf      ";
        const expect = "asdf";
        const actual = Strings.trim(subject);

        assert.equal(actual, expect);
    });

    it("should return a string with the characters on the start and end removed", () =>
    {
        const subject = ".,.,asdf.,.,.,.";
        const expect = "asdf";
        const actual = Strings.trim(subject, '.,');

        assert.equal(actual, expect);
    });
});

describe("String.trimStart", () =>
{
    it("should return a string with the whitespace on the start and end removed", () =>
    {
        const subject = "   asdf      ";
        const expect = "asdf      ";
        const actual = Strings.trimStart(subject);

        assert.equal(actual, expect);
    });

    it("should return a string with the characters on the start and end removed", () =>
    {
        const subject = ".,.,asdf.,.,.,.";
        const expect = "asdf.,.,.,.";
        const actual = Strings.trimStart(subject, '.,');

        assert.equal(actual, expect);
    });
});


describe("String.trimEnd", () =>
{
    it("should return a string with the whitespace on the start and end removed", () =>
    {
        const subject = "   asdf      ";
        const expect = "   asdf";
        const actual = Strings.trimEnd(subject);

        assert.equal(actual, expect);
    });

    it("should return a string with the characters on the start and end removed", () =>
    {
        const subject = ".,.,asdf.,.,.,.";
        const expect = ".,.,asdf";
        const actual = Strings.trimEnd(subject, '.,');

        assert.equal(actual, expect);
    });
});

describe("String.isNullOrEmpty", () =>
{
    it("should return true if the string is undefined", () =>
    {
        assert.equal(Strings.isNullOrEmpty(), true);
    });

    it("should return true if the string is null", () =>
    {
        assert.equal(Strings.isNullOrEmpty(null), true);
    });

    it("should return true if the string is empty", () =>
    {
        assert.equal(Strings.isNullOrEmpty(''), true);
    });

    it("should return false if the string is valid", () =>
    {
        assert.equal(Strings.isNullOrEmpty('a'), false);
    });
});

describe("String.isNullOrWhitespace", () =>
{
    it("should return true if the string is undefined", () =>
    {
        assert.equal(Strings.isNullOrWhitespace(), true);
    });

    it("should return true if the string is null", () =>
    {
        assert.equal(Strings.isNullOrWhitespace(null), true);
    });

    it("should return true if the string is whitespace", () =>
    {
        assert.equal(Strings.isNullOrWhitespace('   '), true);
    });

    it("should return false if the string is empty", () =>
    {
        assert.equal(Strings.isNullOrWhitespace(''), false);
    });

    it("should return false if the string is valid", () =>
    {
        assert.equal(Strings.isNullOrWhitespace('a'), false);
    });
});

describe("String.toCharArray", () =>
{
    it("should return an array with all characters", () =>
    {
        assert.sameOrderedMembers(Strings.toCharArray('1234'), ['1', '2', '3', '4']);
    });

    it("should return an empty array if the string is empty", () =>
    {
        assert.sameOrderedMembers(Strings.toCharArray(''), []);
    });
});

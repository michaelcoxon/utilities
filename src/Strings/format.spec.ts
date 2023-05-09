import format from './format';

describe("format", () =>
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

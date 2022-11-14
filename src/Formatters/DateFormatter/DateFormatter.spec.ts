import DateFormatter from './DateFormatter.js';

describe("DateFormatter.constructor", () =>
{
    it("should construct", () =>
    {
        new DateFormatter();
    });
});

describe("DateFormatter.format", () =>
{
    it("should return the date", () =>
    {
        const subject = new DateFormatter();
        const expected = "13/11/2022";
        const actual = subject.format(new Date(2022, 10, 13, 21, 37, 51, 739), "d/MM/yyyy");

        expect(actual).toEqual(expected);

    });

    it("should return the time", () =>
    {
        const subject = new DateFormatter();
        const expected = "9:37:51.739 PM";
        const actual = subject.format(new Date(2022, 10, 13, 21, 37, 51, 739), "h:mm:ss.fff tt");

        expect(actual).toEqual(expected);

    });

    it("should return the date and time", () =>
    {
        const subject = new DateFormatter();
        const expected = "13/11/2022 9:37:51.739 PM";
        const actual = subject.format(new Date(2022, 10, 13, 21, 37, 51, 739), "d/MM/yyyy h:mm:ss.fff tt");

        expect(actual).toEqual(expected);

    });
});


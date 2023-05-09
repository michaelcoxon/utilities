import TimeSpan from './TimeSpan';



describe("TimeSpan.constructor", () =>
{
    it("should construct", () =>
    {
        new TimeSpan(123);
    });
});

describe("TimeSpan.days", () =>
{
    it("should return the correct number of days", () =>
    {
        const subject = new TimeSpan(623432999);
        const expected = 7;

        const actual = subject.days;

        expect(actual).toEqual(expected);
    });
});

describe("TimeSpan.hours", () =>
{
    it("should return the correct number of hours", () =>
    {
        const subject = new TimeSpan(623432999);
        const expected = 5;

        const actual = subject.hours;

        expect(actual).toEqual(expected);
    });
});

describe("TimeSpan.milliseconds", () =>
{
    it("should return the correct number of milliseconds", () =>
    {
        const subject = new TimeSpan(623432999);
        const expected = 999;

        const actual = subject.milliseconds;

        expect(actual).toEqual(expected);
    });
});

describe("TimeSpan.minutes", () =>
{
    it("should return the correct number of minutes", () =>
    {
        const subject = new TimeSpan(623432999);
        const expected = 10;

        const actual = subject.minutes;

        expect(actual).toEqual(expected);
    });
});

describe("TimeSpan.seconds", () =>
{
    it("should return the correct number of seconds", () =>
    {
        const subject = new TimeSpan(623432999);
        const expected = 32;

        const actual = subject.seconds;

        expect(actual).toEqual(expected);
    });
});

describe("TimeSpan.totalDays", () =>
{
    it("should return the correct number of totalDays", () =>
    {
        const subject = new TimeSpan(623432999);
        const expected = 7.215659710648148;

        const actual = subject.totalDays;

        expect(actual).toEqual(expected);
    });
});

describe("TimeSpan.totalHours", () =>
{
    it("should return the correct number of totalHours", () =>
    {
        const subject = new TimeSpan(623432999);
        const expected = 173.17583305555556;

        const actual = subject.totalHours;

        expect(actual).toEqual(expected);
    });
});

describe("TimeSpan.totalMinutes", () =>
{
    it("should return the correct number of totalMinutes", () =>
    {
        const subject = new TimeSpan(623432999);
        const expected = 10390.549983333334;

        const actual = subject.totalMinutes;

        expect(actual).toEqual(expected);
    });
});

describe("TimeSpan.totalSeconds", () =>
{
    it("should return the correct number of totalSeconds", () =>
    {
        const subject = new TimeSpan(623432999);
        const expected = 623432.999;

        const actual = subject.totalSeconds;

        expect(actual).toEqual(expected);
    });
});

describe("TimeSpan.totalMilliseconds", () =>
{
    it("should return the correct number of totalMilliseconds", () =>
    {
        const subject = new TimeSpan(623432999);
        const expected = 623432999;

        const actual = subject.totalMilliseconds;

        expect(actual).toEqual(expected);
    });
});
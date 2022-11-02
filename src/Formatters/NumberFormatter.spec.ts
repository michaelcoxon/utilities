import NumberFormatter from './NumberFormatter';

describe("NumberFormatter.constructor", () =>
{
    it("should construct", () =>
    {
        new NumberFormatter();
    });
});

describe("NumberFormatter.format", () =>
{
    it("should return the same", () =>
    {
        const subject = new NumberFormatter();
        const expected = "1234.5678";
        const actual = subject.format(1234.5678);

        expect(actual).toEqual(expected);

    });

    describe("currency", () =>
    {
        it("should return as currency default decimals", () =>
        {
            const subject = new NumberFormatter();
            const expected = "$1234.57";
            const actual = subject.format(1234.5678, "c");

            expect(actual).toEqual(expected);

        });

        it("should return as currency to four decimals", () =>
        {
            const subject = new NumberFormatter();
            const expected = "$1234.5678";
            const actual = subject.format(1234.5678, "c4");

            expect(actual).toEqual(expected);

        });
    });

    describe("integers", () =>
    {
        it("should return as integers default", () =>
        {
            const subject = new NumberFormatter();
            const expected = "1235";
            const actual = subject.format(1234.5678, "d");

            expect(actual).toEqual(expected);

        });

        it("should return as integers to four indents", () =>
        {
            const subject = new NumberFormatter();
            const expected = "1235";
            const actual = subject.format(1234.5678, "d4");

            expect(actual).toEqual(expected);

        });

        it("should return as integers to eight indents", () =>
        {
            const subject = new NumberFormatter();
            const expected = "00001235";
            const actual = subject.format(1234.5678, "d8");

            expect(actual).toEqual(expected);

        });
    });


    describe("Exponential", () =>
    {
        it("should return as Exponential default", () =>
        {
            const subject = new NumberFormatter();
            const expected = "1.234568e+3";
            const actual = subject.format(1234.5678, "e");

            expect(actual).toEqual(expected);

        });

        it("should return as Exponential to four indents", () =>
        {
            const subject = new NumberFormatter();
            const expected = "1.2346e+3";
            const actual = subject.format(1234.5678, "e4");

            expect(actual).toEqual(expected);

        });

        it("should return as Exponential to eight indents", () =>
        {
            const subject = new NumberFormatter();
            const expected = "1.23456780e+3";
            const actual = subject.format(1234.5678, "e8");

            expect(actual).toEqual(expected);

        });
    });

    describe("Fixed", () =>
    {
        it("should return as Fixed default", () =>
        {
            const subject = new NumberFormatter();
            const expected = "1234.57";
            const actual = subject.format(1234.5678, "f");

            expect(actual).toEqual(expected);

        });

        it("should return as Fixed to four indents", () =>
        {
            const subject = new NumberFormatter();
            const expected = "1234.5678";
            const actual = subject.format(1234.5678, "f4");

            expect(actual).toEqual(expected);

        });

        it("should return as Fixed to eight indents", () =>
        {
            const subject = new NumberFormatter();
            const expected = "1234.56780000";
            const actual = subject.format(1234.5678, "f8");

            expect(actual).toEqual(expected);

        });
    });
});


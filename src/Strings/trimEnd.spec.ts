import trimEnd from './trimEnd';

describe("trimEnd", () =>
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

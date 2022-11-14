import trimStart from './trimStart';

describe("trimStart", () =>
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

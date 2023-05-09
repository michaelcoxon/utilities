import trim from './trim';

describe("trim", () =>
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

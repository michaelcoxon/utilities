import toFriendlyUrl from './toFriendlyUrl';

describe("toFriendlyUrl", () =>
{
    it("should return the string but formatted for a friendly url", () =>
    {
        const subject = "This Is My Title";
        const expected = "this-is-my-title";
        const actual = toFriendlyUrl(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the string but formatted for a friendly url with 'and'", () =>
    {
        const subject = "This Is My Title & stUff";
        const expected = "this-is-my-title-and-stuff";
        const actual = toFriendlyUrl(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the string but formatted for a friendly url with 'at'", () =>
    {
        const subject = "This Is My Title @stUff";
        const expected = "this-is-my-title-at-stuff";
        const actual = toFriendlyUrl(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the string but formatted for a friendly url with 'and' and with trimmed start characters", () =>
    {
        const subject = "/*+-This Is My Title & stUff";
        const expected = "this-is-my-title-and-stuff";
        const actual = toFriendlyUrl(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the string but formatted for a friendly url with 'and' and with trimmed end characters", () =>
    {
        const subject = "This Is My Title & stUff/*+-";
        const expected = "this-is-my-title-and-stuff";
        const actual = toFriendlyUrl(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the string but formatted for a friendly url with 'and' and without trimmed start characters", () =>
    {
        const subject = "/*+-This Is My Title & stUff";
        const expected = "-this-is-my-title-and-stuff";
        const actual = toFriendlyUrl(subject, true);

        expect(actual).toEqual(expected);
    });

    it("should return the string but formatted for a friendly url with 'and' and without trimmed end characters", () =>
    {
        const subject = "This Is My Title & stUff/*+-";
        const expected = "this-is-my-title-and-stuff-";
        const actual = toFriendlyUrl(subject, true);

        expect(actual).toEqual(expected);
    });
});

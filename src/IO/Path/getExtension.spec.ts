import getExtension from './getExtension';

describe("getExtension", () =>
{
    it("should return the extension of the path relative", () =>
    {
        const subject = "path/to/file.txt";
        const expected = ".txt";
        const actual = getExtension(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the extension of the path absolute url", () =>
    {
        const subject = "https://www.example.com/path/to/file.txt";
        const expected = ".txt";
        const actual = getExtension(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the extension of the path absolute file", () =>
    {
        const subject = "C:\\path\\to\\file.txt";
        const expected = ".txt";
        const actual = getExtension(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the extension of the path relative root", () =>
    {
        const subject = "/path/to/file.txt";
        const expected = ".txt";
        const actual = getExtension(subject);

        expect(actual).toEqual(expected);
    });

    it("should return '' from the path", () =>
    {
        const subject = "/path/to/file";
        const expected = "";
        const actual = getExtension(subject);

        expect(actual).toEqual(expected);
    });
});

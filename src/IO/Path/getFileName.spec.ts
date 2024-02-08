import getFileName from './getFileName';

describe("getFileName", () =>
{
    it("should return the filename of the path relative", () =>
    {
        const subject = "path/to/file";
        const expected = "file";
        const actual = getFileName(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the filename of the path absolute url", () =>
    {
        const subject = "https://www.example.com/path/to/file";
        const expected = "file";
        const actual = getFileName(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the filename of the path absolute file", () =>
    {
        const subject = "C:\\path\\to\\file";
        const expected = "file";
        const actual = getFileName(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the filename of the path relative root", () =>
    {
        const subject = "/path/to/file";
        const expected = "file";
        const actual = getFileName(subject);

        expect(actual).toEqual(expected);
    });
});

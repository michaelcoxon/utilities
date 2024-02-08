import getDirectory from './getDirectory';

describe("getDirectory", () =>
{
    it("should return the directory of the path relative", () =>
    {
        const subject = "path/to/file";
        const expected = "path/to/";
        const actual = getDirectory(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the directory of the path absolute url", () =>
    {
        const subject = "https://www.example.com/path/to/file";
        const expected = "https://www.example.com/path/to/";
        const actual = getDirectory(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the directory of the path absolute file", () =>
    {
        const subject = "C:\\path\\to\\file";
        const expected = "C:\\path\\to\\";
        const actual = getDirectory(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the directory of the path relative root", () =>
    {
        const subject = "/path/to/file";
        const expected = "/path/to/";
        const actual = getDirectory(subject);

        expect(actual).toEqual(expected);
    });
});

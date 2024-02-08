import getFileNameWithoutExtension from './getFileNameWithoutExtension';

describe("getFileNameWithoutExtension", () =>
{
    it("should return the file without the extension of the path relative", () =>
    {
        const subject = "path/to/file.txt";
        const expected = "file";
        const actual = getFileNameWithoutExtension(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the file without the extension of the path absolute url", () =>
    {
        const subject = "https://www.example.com/path/to/file.txt";
        const expected = "file";
        const actual = getFileNameWithoutExtension(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the file without the extension of the path absolute file", () =>
    {
        const subject = "C:\\path\\to\\file.txt";
        const expected = "file";
        const actual = getFileNameWithoutExtension(subject);

        expect(actual).toEqual(expected);
    });

    it("should return the file without the extension of the path relative root", () =>
    {
        const subject = "/path/to/file.txt";
        const expected = "file";
        const actual = getFileNameWithoutExtension(subject);

        expect(actual).toEqual(expected);
    });

    it("should return file without the extension from the path", () =>
    {
        const subject = "/path/to/file";
        const expected = "file";
        const actual = getFileNameWithoutExtension(subject);

        expect(actual).toEqual(expected);
    });
});

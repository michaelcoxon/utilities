﻿import combine from '../../src/IO/Path/combine';
import getDirectory from '../../src/IO/Path/getDirectory';
import getExtension from '../../src/IO/Path/getExtension';
import getFileName from '../../src/IO/Path/getFileName';
import getFileNameWithoutExtension from '../../src/IO/Path/getFileNameWithoutExtension';
import toFriendlyUrl from '../../src/IO/Path/toFriendlyUrl';

describe("Path.combine", () =>
{
    it("should return a combined path relative", () =>
    {
        const components = ["path", "to", "file"];
        const expected = "path/to/file";
        const actual = combine(...components);

        expect(actual).toEqual(expected);
    });

    it("should return a combined path absolute url", () =>
    {
        const components = ["https://www.example.com", "path", "to", "file"];
        const expected = "https://www.example.com/path/to/file";
        const actual = combine(...components);

        expect(actual).toEqual(expected);
    });

    it("should return a combined path absolute file", () =>
    {
        const components = ["C:\\", "path", "to", "file"];
        const expected = "C:\\path\\to\\file";
        const actual = combine(...components);

        expect(actual).toEqual(expected);
    });

    it("should return a combined path relative root", () =>
    {
        const components = ["/path", "to", "file"];
        const expected = "/path/to/file";
        const actual = combine(...components);

        expect(actual).toEqual(expected);
    });

    it("should return a combined path relative root 2", () =>
    {
        const components = ["/", "path", "to", "file"];
        const expected = "/path/to/file";
        const actual = combine(...components);

        expect(actual).toEqual(expected);
    });
});

describe("Path.getFileName", () =>
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


describe("Path.getDirectory", () =>
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


describe("Path.getExtension", () =>
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

describe("Path.getFileNameWithoutExtension", () =>
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

describe("Path.toFriendlyUrl", () =>
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
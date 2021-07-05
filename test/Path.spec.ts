import Path from '../src/Path';
import { expect, assert } from 'chai';
import 'mocha';


describe("Path.combine", () =>
{
    it("should return a combined path relative", () =>
    {
        const components = ["path", "to", "file"];
        const expect = "path/to/file";
        const actual = Path.combine(...components);

        assert.equal(actual, expect);
    });

    it("should return a combined path absolute url", () =>
    {
        const components = ["https://www.example.com", "path", "to", "file"];
        const expect = "https://www.example.com/path/to/file";
        const actual = Path.combine(...components);

        assert.equal(actual, expect);
    });

    it("should return a combined path absolute file", () =>
    {
        const components = ["C:\\", "path", "to", "file"];
        const expect = "C:\\path\\to\\file";
        const actual = Path.combine(...components);

        assert.equal(actual, expect);
    });

    it("should return a combined path relative root", () =>
    {
        const components = ["/path", "to", "file"];
        const expect = "/path/to/file";
        const actual = Path.combine(...components);

        assert.equal(actual, expect);
    });

    it("should return a combined path relative root 2", () =>
    {
        const components = ["/", "path", "to", "file"];
        const expect = "/path/to/file";
        const actual = Path.combine(...components);

        assert.equal(actual, expect);
    });
});

describe("Path.getFileName", () =>
{
    it("should return the filename of the path relative", () =>
    {
        const subject = "path/to/file";
        const expect = "file";
        const actual = Path.getFileName(subject);

        assert.equal(actual, expect);
    });

    it("should return the filename of the path absolute url", () =>
    {
        const subject = "https://www.example.com/path/to/file";
        const expect = "file";
        const actual = Path.getFileName(subject);

        assert.equal(actual, expect);
    });

    it("should return the filename of the path absolute file", () =>
    {
        const subject = "C:\\path\\to\\file";
        const expect = "file";
        const actual = Path.getFileName(subject);

        assert.equal(actual, expect);
    });

    it("should return the filename of the path relative root", () =>
    {
        const subject = "/path/to/file";
        const expect = "file";
        const actual = Path.getFileName(subject);

        assert.equal(actual, expect);
    });
});


describe("Path.getDirectory", () =>
{
    it("should return the directory of the path relative", () =>
    {
        const subject = "path/to/file";
        const expect = "path/to/";
        const actual = Path.getDirectory(subject);

        assert.equal(actual, expect);
    });

    it("should return the directory of the path absolute url", () =>
    {
        const subject = "https://www.example.com/path/to/file";
        const expect = "https://www.example.com/path/to/";
        const actual = Path.getDirectory(subject);

        assert.equal(actual, expect);
    });

    it("should return the directory of the path absolute file", () =>
    {
        const subject = "C:\\path\\to\\file";
        const expect = "C:\\path\\to\\";
        const actual = Path.getDirectory(subject);

        assert.equal(actual, expect);
    });

    it("should return the directory of the path relative root", () =>
    {
        const subject = "/path/to/file";
        const expect = "/path/to/";
        const actual = Path.getDirectory(subject);

        assert.equal(actual, expect);
    });
});


describe("Path.getExtension", () =>
{
    it("should return the extension of the path relative", () =>
    {
        const subject = "path/to/file.txt";
        const expect = ".txt";
        const actual = Path.getExtension(subject);

        assert.equal(actual, expect);
    });

    it("should return the extension of the path absolute url", () =>
    {
        const subject = "https://www.example.com/path/to/file.txt";
        const expect = ".txt";
        const actual = Path.getExtension(subject);

        assert.equal(actual, expect);
    });

    it("should return the extension of the path absolute file", () =>
    {
        const subject = "C:\\path\\to\\file.txt";
        const expect = ".txt";
        const actual = Path.getExtension(subject);

        assert.equal(actual, expect);
    });

    it("should return the extension of the path relative root", () =>
    {
        const subject = "/path/to/file.txt";
        const expect = ".txt";
        const actual = Path.getExtension(subject);

        assert.equal(actual, expect);
    });

    it("should return '' from the path", () =>
    {
        const subject = "/path/to/file";
        const expect = "";
        const actual = Path.getExtension(subject);

        assert.equal(actual, expect);
    });
});

describe("Path.getFileNameWithoutExtension", () =>
{
    it("should return the file without the extension of the path relative", () =>
    {
        const subject = "path/to/file.txt";
        const expect = "file";
        const actual = Path.getFileNameWithoutExtension(subject);

        assert.equal(actual, expect);
    });

    it("should return the file without the extension of the path absolute url", () =>
    {
        const subject = "https://www.example.com/path/to/file.txt";
        const expect = "file";
        const actual = Path.getFileNameWithoutExtension(subject);

        assert.equal(actual, expect);
    });

    it("should return the file without the extension of the path absolute file", () =>
    {
        const subject = "C:\\path\\to\\file.txt";
        const expect = "file";
        const actual = Path.getFileNameWithoutExtension(subject);

        assert.equal(actual, expect);
    });

    it("should return the file without the extension of the path relative root", () =>
    {
        const subject = "/path/to/file.txt";
        const expect = "file";
        const actual = Path.getFileNameWithoutExtension(subject);

        assert.equal(actual, expect);
    });

    it("should return file without the extension from the path", () =>
    {
        const subject = "/path/to/file";
        const expect = "file";
        const actual = Path.getFileNameWithoutExtension(subject);

        assert.equal(actual, expect);
    });
});

describe("Path.toFriendlyUrl", () =>
{
    it("should return the string but formatted for a friendly url", () =>
    {
        const subject = "This Is My Title";
        const expect = "this-is-my-title";
        const actual = Path.toFriendlyUrl(subject);

        assert.equal(actual, expect);
    });

    it("should return the string but formatted for a friendly url with 'and'", () =>
    {
        const subject = "This Is My Title & stUff";
        const expect = "this-is-my-title-and-stuff";
        const actual = Path.toFriendlyUrl(subject);

        assert.equal(actual, expect);
    });
    
    it("should return the string but formatted for a friendly url with 'at'", () =>
    {
        const subject = "This Is My Title @stUff";
        const expect = "this-is-my-title-at-stuff";
        const actual = Path.toFriendlyUrl(subject);

        assert.equal(actual, expect);
    });

    it("should return the string but formatted for a friendly url with 'and' and with trimmed start characters", () =>
    {
        const subject = "/*+-This Is My Title & stUff";
        const expect = "this-is-my-title-and-stuff";
        const actual = Path.toFriendlyUrl(subject);

        assert.equal(actual, expect);
    });

    it("should return the string but formatted for a friendly url with 'and' and with trimmed end characters", () =>
    {
        const subject = "This Is My Title & stUff/*+-";
        const expect = "this-is-my-title-and-stuff";
        const actual = Path.toFriendlyUrl(subject);

        assert.equal(actual, expect);
    });

    it("should return the string but formatted for a friendly url with 'and' and without trimmed start characters", () =>
    {
        const subject = "/*+-This Is My Title & stUff";
        const expect = "-this-is-my-title-and-stuff";
        const actual = Path.toFriendlyUrl(subject, true);

        assert.equal(actual, expect);
    });

    it("should return the string but formatted for a friendly url with 'and' and without trimmed end characters", () =>
    {
        const subject = "This Is My Title & stUff/*+-";
        const expect = "this-is-my-title-and-stuff-";
        const actual = Path.toFriendlyUrl(subject, true);

        assert.equal(actual, expect);
    });
});
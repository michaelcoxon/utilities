import combine from './combine';

describe("combine", () =>
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

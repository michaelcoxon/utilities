import StringBuilder from '../../src/IO/StringBuilder.js';
import empty from '../Utilities/empty.js';

describe("StringBuilder.constructor", () =>
{
    it("should return a new StringBuilder", () =>
    {
        const sb = new StringBuilder();
        expect(sb.toString()).toEqual(empty);
    });

    it("should return a new StringBuilder with constructor data", () =>
    {
        const sb = new StringBuilder("Hello");
        expect(sb.toString()).toEqual("Hello");
    });
});

describe("StringBuilder.append", () =>
{
    it("should return ' world!'", () =>
    {
        const sb = new StringBuilder();
        sb.append(" world!");
        expect(sb.toString()).toEqual(" world!");
    });

    it("should return 'Hello world!'", () =>
    {
        const sb = new StringBuilder("Hello");
        sb.append(" world!");
        expect(sb.toString()).toEqual("Hello world!");
    });
});

describe("StringBuilder.appendLine", () =>
{
    it("should return ' world!\\n'", () =>
    {
        const sb = new StringBuilder();
        sb.appendLine(" world!");
        expect(sb.toString()).toEqual(" world!\n");
    });

    it("should return 'Hello world!\\n'", () =>
    {
        const sb = new StringBuilder("Hello");
        sb.appendLine(" world!");
        expect(sb.toString()).toEqual("Hello world!\n");
    });
});

describe("StringBuilder.clear", () =>
{
    it("should return ' clear!'", () =>
    {
        const sb = new StringBuilder();
        sb.appendLine(" world!");
        sb.clear();
        sb.append(" clear!");

        expect(sb.toString()).toEqual(" clear!");
    });

    it("should return 'Goodbye clear!\\n'", () =>
    {
        const sb = new StringBuilder("Hello");
        sb.appendLine(" world!");
        sb.clear();
        sb.append("Goodbye");
        sb.appendLine(" clear!");
        expect(sb.toString()).toEqual("Goodbye clear!\n");
    });
});

describe("StringBuilder.toString", () =>
{
    it("should return a cached version of ' clear!'", () =>
    {
        const sb = new StringBuilder();
        sb.appendLine(" world!");
        sb.clear();
        sb.append(" clear!");

        expect(sb.toString()).toEqual(" clear!");
        expect(sb.toString()).toEqual(" clear!");
    });
});
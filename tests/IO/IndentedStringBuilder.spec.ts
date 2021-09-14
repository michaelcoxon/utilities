import { IndentedStringBuilder, empty } from '../../src';

describe("IndentedStringBuilder.constructor", () =>
{
    it("should return a new IndentedStringBuilder", () =>
    {
        const sb = new IndentedStringBuilder(0);
        expect(sb.toString()).toEqual(empty);
    });

    it("should return a new IndentedStringBuilder with constructor data", () =>
    {
        const sb = new IndentedStringBuilder(0, "Hello");
        expect(sb.toString()).toEqual("Hello\n");
    });
});

describe("IndentedStringBuilder.appendLine", () =>
{
    it("should return ' world!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0);
        sb.appendLine(" world!");
        expect(sb.toString()).toEqual(" world!\n");
    });

    it("should return 'Hello world!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0, "Hello");
        sb.appendLine(" world!");
        expect(sb.toString()).toEqual("Hello\n world!\n");
    });
});

describe("IndentedStringBuilder indenting", () =>
{
    it("should return '\\t world!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0);
        sb.indent();
        {
            sb.appendLine(" world!");
        }
        sb.unindent();
        expect(sb.toString()).toEqual("\t world!\n");
    });

    it("should return 'Hello\\n\\t world!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0, "Hello");
        sb.indent();
        {
            sb.appendLine(" world!");
        }
        sb.unindent();
        expect(sb.toString()).toEqual("Hello\n\t world!\n");
    });

    it("should return 'Hello\\n\\t world!\\n' (unindent too many times)", () =>
    {
        const sb = new IndentedStringBuilder(0, "Hello");
        sb.indent();
        {
            sb.appendLine(" world!");
        }
        sb.unindent();
        sb.unindent();
        expect(sb.toString()).toEqual("Hello\n\t world!\n");
    });
});

describe("IndentedStringBuilder.clear", () =>
{
    it("should return ' clear!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0);
        sb.appendLine(" world!");
        sb.clear();
        sb.appendLine(" clear!");

        expect(sb.toString()).toEqual(" clear!\n");
    });

    it("should return 'Goodbye\\n clear!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0, "Hello");
        sb.appendLine(" world!");
        sb.clear();
        sb.appendLine("Goodbye");
        sb.appendLine(" clear!");
        expect(sb.toString()).toEqual("Goodbye\n clear!\n");
    });
});

describe("IndentedStringBuilder.toString", () =>
{
    it("should return a cached version of ' clear!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0);
        sb.appendLine(" world!");
        sb.clear();
        sb.appendLine(" clear!");

        expect(sb.toString()).toEqual(" clear!\n");
        expect(sb.toString()).toEqual(" clear!\n");
    });
});
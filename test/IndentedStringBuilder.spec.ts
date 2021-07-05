import Strings from '../src/Strings';
import IndentedStringBuilder from '../src/IO/IndentedStringBuilder';
import { expect, assert } from 'chai';
import 'mocha';

describe("IndentedStringBuilder.constructor", () =>
{
    it("should return a new IndentedStringBuilder", () =>
    {
        const sb = new IndentedStringBuilder(0);
        assert.equal(sb.toString(), Strings.empty);
    });

    it("should return a new IndentedStringBuilder with constructor data", () =>
    {
        const sb = new IndentedStringBuilder(0, "Hello");
        assert.equal(sb.toString(), "Hello\n");
    });
});

describe("IndentedStringBuilder.appendLine", () =>
{
    it("should return ' world!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0);
        sb.appendLine(" world!");
        assert.equal(sb.toString(), " world!\n");
    });

    it("should return 'Hello world!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0, "Hello");
        sb.appendLine(" world!");
        assert.equal(sb.toString(), "Hello\n world!\n");
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
        assert.equal(sb.toString(), "\t world!\n");
    });

    it("should return 'Hello\\n\\t world!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0, "Hello");
        sb.indent();
        {
            sb.appendLine(" world!");
        }
        sb.unindent();
        assert.equal(sb.toString(), "Hello\n\t world!\n");
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
        assert.equal(sb.toString(), "Hello\n\t world!\n");
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

        assert.equal(sb.toString(), " clear!\n");
    });

    it("should return 'Goodbye\\n clear!\\n'", () =>
    {
        const sb = new IndentedStringBuilder(0, "Hello");
        sb.appendLine(" world!");
        sb.clear();
        sb.appendLine("Goodbye");
        sb.appendLine(" clear!");
        assert.equal(sb.toString(), "Goodbye\n clear!\n");
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

        assert.equal(sb.toString(), " clear!\n");
        assert.equal(sb.toString(), " clear!\n");
    });
});
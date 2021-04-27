import Strings from '../src/Strings';
import StringBuilder from '../src/StringBuilder';
import { expect, assert } from 'chai';
import 'mocha';

describe("StringBuilder.constructor", () =>
{
    it("should return a new StringBuilder", () =>
    {
        const sb = new StringBuilder();
        assert.equal(sb.toString(), Strings.empty);
    });

    it("should return a new StringBuilder with constructor data", () =>
    {
        const sb = new StringBuilder("Hello");
        assert.equal(sb.toString(), "Hello");
    });
});

describe("StringBuilder.append", () =>
{
    it("should return ' world!'", () =>
    {
        const sb = new StringBuilder();
        sb.append(" world!");
        assert.equal(sb.toString(), " world!");
    });

    it("should return 'Hello world!'", () =>
    {
        const sb = new StringBuilder("Hello");
        sb.append(" world!");
        assert.equal(sb.toString(), "Hello world!");
    });
});

describe("StringBuilder.appendLine", () =>
{
    it("should return ' world!\\n'", () =>
    {
        const sb = new StringBuilder();
        sb.appendLine(" world!");
        assert.equal(sb.toString(), " world!\n");
    });

    it("should return 'Hello world!\\n'", () =>
    {
        const sb = new StringBuilder("Hello");
        sb.appendLine(" world!");
        assert.equal(sb.toString(), "Hello world!\n");
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

        assert.equal(sb.toString(), " clear!");
    });

    it("should return 'Goodbye clear!\\n'", () =>
    {
        const sb = new StringBuilder("Hello");
        sb.appendLine(" world!");
        sb.clear();
        sb.append("Goodbye");
        sb.appendLine(" clear!");
        assert.equal(sb.toString(), "Goodbye clear!\n");
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

        assert.equal(sb.toString(), " clear!");
        assert.equal(sb.toString(), " clear!");
    });
});
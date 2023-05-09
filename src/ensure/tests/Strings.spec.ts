import { throws } from 'assert';
import ensure from '../ensure';

describe("Ensure a string isNotNull", () =>
{
    it("'asdf' should not throw an exception", () =>
    {
        isNotNull("asdf");
    });

    it("'null' should throw an exception", () =>
    {
        throws(() => isNotNull(null));
    });
});

describe("Ensure a string isNotUndefined", () =>
{
    it("'asdf' should not throw an exception", () =>
    {
        isNotUndefined("asdf");
    });

    it("'undefined' should throw an exception", () =>
    {
        throws(() => isNotUndefined());
    });
});

describe("Ensure a string isNotNullOrUndefined", () =>
{
    it("'asdf' should not throw an exception", () =>
    {
        isNotNullOrUndefined("asdf");
    });

    it("'null' should throw an exception", () =>
    {
        throws(() => isNotNullOrUndefined(null));
    });

    it("'undefined' should throw an exception", () =>
    {
        throws(() => isNotNullOrUndefined());
    });
});

describe("Ensure a string isNotNullOrUndefinedOrEmpty", () =>
{
    it("'asdf' should not throw an exception", () =>
    {
        isNotNullOrUndefinedOrEmpty("asdf");
    });

    it("'null' should throw an exception", () =>
    {
        throws(() => isNotNullOrUndefinedOrEmpty(null));
    });

    it("'undefined' should throw an exception", () =>
    {
        throws(() => isNotNullOrUndefinedOrEmpty());
    });

    it("'' should throw an exception", () =>
    {
        throws(() => isNotNullOrUndefinedOrEmpty(""));
    });
});

describe("Ensure a string isOneOf", () =>
{
    it("'asdf' should not throw an exception", () =>
    {
        isOneOf("asdf");
    });

    it("'' should not throw an exception", () =>
    {
        isOneOf("");
    });

    it("'fdsa' should not throw an exception", () =>
    {
        isOneOf("fdsa");
    });

    it("'qwer' should throw an exception", () =>
    {
        throws(() => isOneOf("qwer"));
    });
});

describe("Ensure a string matches", () =>
{
    it("'asdf' should not throw an exception", () =>
    {
        matches("asdf");
    });

    it("'null' should throw an exception", () =>
    {
        throws(() => matches(null));
    });
});

describe("Ensure a string matchesRegex", () =>
{
    it("'asdf' should not throw an exception", () =>
    {
        matchesRegex("asdf");
    });

    it("'null' should throw an exception", () =>
    {
        throws(() => matchesRegex(null));
    });
});

function isNotNull(str: string | null)
{
    ensure(str, "str").isNotNull();
}

function isNotUndefined(str?: string)
{
    ensure(str, "str").isNotUndefined();
}

function isNotNullOrUndefined(str?: string | null)
{
    ensure(str, "str").isNotNullOrUndefined();
}

function isNotNullOrUndefinedOrEmpty(str?: string | null)
{
    ensure(str, "str").isNotNullOrUndefinedOrEmpty();
}

function isOneOf(str: string)
{
    ensure(str, "str").isOneOf("asdf", "", "fdsa");
}

function matches(str: string | null)
{
    ensure(str, "str").matches(s => s === "asdf");
}

function matchesRegex(str: string | null)
{
    ensure(str, "str").matchesRegex(/^asdf$/);
}

import ensure from '../../src/Ensure/ensure.js';

describe("Ensure a string isNotNull", () =>
{
    function testMethod(str: string | null)
    {
        ensure(str, "str").isNotNull();
    }

    it("'asdf' should not throw an exception", () =>
    {
        try
        {
            testMethod("asdf");
        }
        catch
        {
            fail();
        }
    });

    it("'null' should throw an exception", (done) =>
    {
        try
        {
            testMethod(null);
            fail();
        }
        catch
        {
            done();
        }
    });
});

describe("Ensure a string isNotUndefined", () =>
{
    function testMethod(str?: string)
    {
        ensure(str, "str").isNotUndefined();
    }

    it("'asdf' should not throw an exception", () =>
    {
        try
        {
            testMethod("asdf");
        }
        catch
        {
            fail();
        }
    });

    it("'undefined' should throw an exception", (done) =>
    {
        try
        {
            testMethod();
            fail();
        }
        catch
        {
            done();
        }
    });
});

describe("Ensure a string isNotNullOrUndefined", () =>
{
    function testMethod(str?: string | null)
    {
        ensure(str, "str").isNotNullOrUndefined();
    }

    it("'asdf' should not throw an exception", () =>
    {
        try
        {
            testMethod("asdf");
        }
        catch
        {
            fail();
        }
    });

    it("'null' should throw an exception", (done) =>
    {
        try
        {
            testMethod(null);
            fail();
        }
        catch
        {
            done();
        }
    });

    it("'undefined' should throw an exception", (done) =>
    {
        try
        {
            testMethod();
            fail();
        }
        catch
        {
            done();
        }
    });
});

describe("Ensure a string isNotNullOrUndefinedOrEmpty", () =>
{
    function testMethod(str?: string | null)
    {
        ensure(str, "str").isNotNullOrUndefinedOrEmpty();
    }

    it("'asdf' should not throw an exception", () =>
    {
        try
        {
            testMethod("asdf");
        }
        catch
        {
            fail();
        }
    });

    it("'null' should throw an exception", (done) =>
    {
        try
        {
            testMethod(null);
            fail();
        }
        catch
        {
            done();
        }
    });

    it("'undefined' should throw an exception", (done) =>
    {
        try
        {
            testMethod();
            fail();
        }
        catch
        {
            done();
        }
    });

    it("'' should throw an exception", (done) =>
    {
        try
        {
            testMethod("");
            fail();
        }
        catch
        {
            done();
        }
    });
});

describe("Ensure a string isOneOf", () =>
{
    function testMethod(str: string)
    {
        ensure(str, "str").isOneOf("asdf", "", "fdsa");
    }

    it("'asdf' should not throw an exception", () =>
    {
        try
        {
            testMethod("asdf");
        }
        catch
        {
            fail();
        }
    });

    it("'' should not throw an exception", () =>
    {
        try
        {
            testMethod("");
        }
        catch
        {
            fail();
        }
    });

    it("'fdsa' should not throw an exception", () =>
    {
        try
        {
            testMethod("fdsa");
        }
        catch
        {
            fail();
        }
    });

    it("'qwer' should throw an exception", (done) =>
    {
        try
        {
            testMethod("qwer");
            fail();
        }
        catch
        {
            done();
        }
    });
});

describe("Ensure a string matches", () =>
{
    function testMethod(str: string | null)
    {
        ensure(str, "str").matches(s => s === "asdf");
    }

    it("'asdf' should not throw an exception", () =>
    {
        try
        {
            testMethod("asdf");
        }
        catch
        {
            fail();
        }
    });

    it("'null' should throw an exception", (done) =>
    {
        try
        {
            testMethod(null);
            fail();
        }
        catch
        {
            done();
        }
    });
});

describe("Ensure a string matchesRegex", () =>
{
    function testMethod(str: string | null)
    {
        ensure(str, "str").matchesRegex(/^asdf$/);
    }

    it("'asdf' should not throw an exception", () =>
    {
        try
        {
            testMethod("asdf");
        }
        catch
        {
            fail();
        }
    });

    it("'null' should throw an exception", (done) =>
    {
        try
        {
            testMethod(null);
            fail();
        }
        catch
        {
            done();
        }
    });
});

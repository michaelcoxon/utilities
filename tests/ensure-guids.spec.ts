import { arg, Guid } from '../src';

describe("Ensure a Guid isNotNull", () =>
{
    function testMethod(guid: Guid | null)
    {
        arg(guid, "guid").isNotNull();
    }

    it("'Guid.newGuid()' should not throw an exception", () =>
    {
        try
        {
            testMethod(Guid.newGuid());
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

describe("Ensure a Guid isNotUndefined", () =>
{
    function testMethod(guid?: Guid)
    {
        arg(guid, "guid").isNotUndefined();
    }

    it("'Guid.newGuid()' should not throw an exception", () =>
    {
        try
        {
            testMethod(Guid.newGuid());
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

describe("Ensure a Guid isNotNullOrUndefined", () =>
{
    function testMethod(guid?: Guid | null)
    {
        arg(guid, "guid").isNotNullOrUndefined();
    }

    it("'Guid.newGuid()' should not throw an exception", () =>
    {
        try
        {
            testMethod(Guid.newGuid());
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

describe("Ensure a Guid isOneOf", () =>
{
    const guid1 = Guid.newGuid();
    const guid2 = Guid.newGuid();
    const guid3 = Guid.newGuid();
    const guid4 = Guid.newGuid();

    function testMethod(guid: Guid)
    {
        console.log(guid.toString());
        arg(guid, "guid").isOneOf(guid1, guid2, guid3);
    }

    it("'guid1' should not throw an exception", () =>
    {
        try
        {
            testMethod(Guid.parseString(guid1.toString()));
        }
        catch
        {
            fail();
        }
    });

    it("'guid2' should not throw an exception", () =>
    {
        try
        {
            testMethod(Guid.parseString(guid2.toString()));
        }
        catch
        {
            fail();
        }
    });

    it("'guid3' should not throw an exception", () =>
    {
        try
        {
            testMethod(Guid.parseString(guid3.toString()));
        }
        catch
        {
            fail();
        }
    });

    it("'guid4' should throw an exception", (done) =>
    {
        try
        {
            testMethod(Guid.parseString(guid4.toString()));
            fail();
        }
        catch
        {
            done();
        }
    });
});

describe("Ensure a Guid matches", () =>
{
    const guid = Guid.newGuid();


    function testMethod(guid: Guid | null)
    {
        arg(guid, "guid").matches(s => s == guid);
    }

    it("'Guid.newGuid()' should not throw an exception", () =>
    {
        try
        {
            testMethod(Guid.parseString(guid.toString()));
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

describe("Ensure a Guid isValidGuid", () =>
{
    function testMethod(guid: Guid | null)
    {
        arg(guid, "guid").isValidGuid();
    }

    it("'Guid.newGuid()' should not throw an exception", () =>
    {
        try
        {
            testMethod(Guid.newGuid());
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

    it("'Guid.empty' should throw an exception", (done) =>
    {
        try
        {
            testMethod(Guid.empty);
            fail();
        }
        catch
        {
            done();
        }
    });
});
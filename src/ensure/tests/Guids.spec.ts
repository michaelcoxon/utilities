import ensure from '../ensure';
import Guid from '../../Guid';
import { throws } from 'assert';

describe("Ensure a Guid isNotNull", () =>
{
    it("'Guid.newGuid()' should not throw an exception", () =>
    {
        isNotNull(Guid.newGuid());
    });

    it("'null' should throw an exception", () =>
    {
        throws(() => isNotNull(null));
    });
});

describe("Ensure a Guid isNotUndefined", () =>
{
    it("'Guid.newGuid()' should not throw an exception", () =>
    {
        isNotUndefined(Guid.newGuid());
    });

    it("'undefined' should throw an exception", () =>
    {
        throws(() => isNotUndefined());
    });
});

describe("Ensure a Guid isNotNullOrUndefined", () =>
{
    it("'Guid.newGuid()' should not throw an exception", () =>
    {
        isNotNullOrUndefined(Guid.newGuid());
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

describe("Ensure a Guid isOneOf", () =>
{
    it("'guid1' should not throw an exception", () =>
    {
        isOneOf(Guid.parseString(guid1.toString()));
    });

    it("'guid2' should not throw an exception", () =>
    {
        isOneOf(Guid.parseString(guid2.toString()));
    });

    it("'guid3' should not throw an exception", () =>
    {
        isOneOf(Guid.parseString(guid3.toString()));
    });

    it("'guid4' should throw an exception", () =>
    {
        throws(() => isOneOf(Guid.parseString(guid4.toString())));
    });
});

describe("Ensure a Guid matches", () =>
{
    const guid = Guid.newGuid();


    it("'Guid.newGuid()' should not throw an exception", () =>
    {
        matches(Guid.parseString(guid.toString()));
    });

    it("'null' should not throw an exception", () =>
    {
        // this is because null == null no way around it.
        matches(null);
    });
});

describe("Ensure a Guid isValidGuid", () =>
{
    it("'Guid.newGuid()' should not throw an exception", () =>
    {
        isValidGuid(Guid.newGuid());
    });

    it("'null' should throw an exception", () =>
    {
        throws(() => isValidGuid(null));
    });

    it("'Guid.empty' should throw an exception", () =>
    {
        throws(() => isValidGuid(Guid.empty));
    });
});






function isNotNull(guid: Guid | null)
{
    ensure(guid, "guid").isNotNull();
}

function isNotUndefined(guid?: Guid)
{
    ensure(guid, "guid").isNotUndefined();
}

function isNotNullOrUndefined(guid?: Guid | null)
{
    ensure(guid, "guid").isNotNullOrUndefined();
}

const guid1 = Guid.newGuid();
const guid2 = Guid.newGuid();
const guid3 = Guid.newGuid();
const guid4 = Guid.newGuid();
function isOneOf(guid: Guid)
{
    ensure(guid, "guid").isOneOf(guid1, guid2, guid3);
}

function matches(guid: Guid | null)
{
    ensure(guid, "guid").matches(s => s == guid);
}

function isValidGuid(guid: Guid | null)
{
    ensure(guid, "guid").isValidGuid();
}


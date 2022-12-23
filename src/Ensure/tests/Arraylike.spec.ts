import { throws } from 'assert';
import ensure from '../ensure';

describe("Ensure a ArrayLike isNotNull", () =>
{
    it("'[]' should not throw an exception", () =>
    {
        isNotNull([]);
    });

    it("'null' should throw an exception", () =>
    {
        throws(() => isNotNull(null));
    });
});

describe("Ensure a ArrayLike isNotUndefined", () =>
{
    it("'[]' should not throw an exception", () =>
    {
        isNotUndefined([]);
    });

    it("'undefined' should throw an exception", () =>
    {
        throws(() => isNotUndefined());
    });
});

describe("Ensure a ArrayLike isNotNullOrUndefined", () =>
{
    it("'[]' should not throw an exception", () =>
    {
        isNotNullOrUndefined([]);
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

describe("Ensure a ArrayLike matches", () =>
{
    it("'[1,2,3,4]' should not throw an exception", () =>
    {
        matches([1, 2, 3, 4]);
    });

    it("'[]' should throw an exception", () =>
    {
        throws(() => matches([]));
    });

    it("'null' should throw an exception", () =>
    {
        throws(() => matches(null));
    });
});

describe("Ensure a ArrayLike isNotNullOrUndefinedOrEmpty", () =>
{
    it("'[1,2,3,4]' should not throw an exception", () =>
    {
        isNotNullOrUndefinedOrEmpty([1, 2, 3, 4]);
    });

    it("'null' should throw an exception", () =>
    {
        throws(() => isNotNullOrUndefinedOrEmpty(null));
    });

    it("'undefined' should throw an exception", () =>
    {
        throws(() => isNotNullOrUndefinedOrEmpty());
    });

    it("'[]' should throw an exception", () =>
    {
        throws(() =>  isNotNullOrUndefinedOrEmpty([]));
    });
});

function isNotNull<T>(arrayLike: ArrayLike<T> | null)
{
    ensure(arrayLike, "arrayLike").isNotNull();
}

function isNotUndefined<T>(arrayLike?: ArrayLike<T>)
{
    ensure(arrayLike, "arrayLike").isNotUndefined();
}

function isNotNullOrUndefined<T>(arrayLike?: ArrayLike<T> | null)
{
    ensure(arrayLike, "arrayLike").isNotNullOrUndefined();
}

function matches<T>(arrayLike: ArrayLike<T> | null)
{
    ensure(arrayLike, "arrayLike").matches(s => s.length == 4);
}

function isNotNullOrUndefinedOrEmpty<T>(arrayLike?: ArrayLike<T> | null)
{
    ensure(arrayLike, "arrayLike").isNotNullOrUndefinedOrEmpty();
}


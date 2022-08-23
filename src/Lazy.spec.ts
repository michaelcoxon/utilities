import Lazy from './Lazy';

describe("Lazy.constructor", () =>
{
    it("should return a new Lazy", () =>
    {
        const actual = new Lazy<string>(() => "mystring");
        expect(actual).not.toBeNull();
    });

    it("should not call the factory until it has been asked for", () =>
    {
        let wasCalled = false;

        const factory = () =>
        {
            const value = "mystring";
            wasCalled = true;
            return value;
        }

        const actual = new Lazy<string>(factory);

        expect(!wasCalled);
        actual.value;
        expect(wasCalled);
    });
});

describe("Lazy.value", () =>
{
    it("should return the value", () =>
    {
        const factory = () => "mystring";
        const lazy = new Lazy<string>(factory);

        expect(!lazy.isValueCreated);

        const actual = lazy.value;

        expect(lazy.isValueCreated);
        expect("mystring").toEqual(actual);

    });

    it("should not re-call the factory", () =>
    {
        let wasCalled = false;

        const factory = () =>
        {
            if (wasCalled)
            {
                fail("factory was called again");
            }
            const value = "mystring";
            wasCalled = true;
            return value;
        }

        const lazy = new Lazy<string>(factory);

        const firstActual = lazy.value;
        expect("mystring").toEqual(firstActual);
        const secondActual = lazy.value;
        expect("mystring").toEqual(secondActual);

    });
});
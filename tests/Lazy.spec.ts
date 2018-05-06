import { Lazy } from '../src/Lazy';
import { expect, assert } from 'chai';
import 'mocha';


describe("Lazy.constructor", () =>
{
    it("should return a new Lazy", () =>
    {
        const actual = new Lazy<string>(() => "mystring");
        assert.isNotNull(actual);
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

        assert.isFalse(wasCalled);
        const promise = actual.value;
        assert.isTrue(wasCalled);
    });
});

describe("Lazy.value", () =>
{
    it("should return the value", () =>
    {
        const factory = () => "mystring";
        const lazy = new Lazy<string>(factory);

        assert.isFalse(lazy.isValueCreated);

        const actual = lazy.value;

        assert.isTrue(lazy.isValueCreated);
        assert.equal("mystring", actual);

    });

    it("should not re-call the factory", () =>
    {
        let wasCalled = false;

        const factory = () =>
        {
            if (wasCalled)
            {
                assert.fail(undefined, undefined, "factory was called again");
            }
            const value = "mystring";
            wasCalled = true;
            return value;
        }

        const lazy = new Lazy<string>(factory);

        const firstActual = lazy.value;
        assert.equal("mystring", firstActual);
        const secondActual = lazy.value;
        assert.equal("mystring", secondActual);

    });
});
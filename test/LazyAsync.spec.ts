import LazyAsync from '../src/LazyAsync';
import { expect, assert } from 'chai';
import 'mocha';
import Guid from '../src/Guid';


describe("LazyAsync.constructor", () =>
{
    it("should return a new LazyAsync", () =>
    {
        const promiseFactory = () => new Promise<Guid>((resolve, reject) => resolve(Guid.newGuid()));
        const actual = new LazyAsync<Guid>(promiseFactory);
        assert.isNotNull(actual);
    });

    it("should not call the factory until it has been asked for", () =>
    {
        let wasCalled = false;

        const promiseFactory = () =>
        {
            const promise = new Promise<Guid>((resolve, reject) => resolve(Guid.newGuid()));
            wasCalled = true;
            return promise;
        }

        const actual = new LazyAsync<Guid>(promiseFactory);

        assert.isFalse(wasCalled);
        const promise = actual.value;
        assert.isTrue(wasCalled);
    });
});

describe("LazyAsync.value", () =>
{
    it("should return the same value every time", () =>
    {
        const promiseFactory = () => new Promise<Guid>((resolve, reject) => resolve(Guid.newGuid()));
        const lazy = new LazyAsync<Guid>(promiseFactory);

        assert.isFalse(lazy.isValueCreated);

        let firstValue: Guid;
        let secondValue: Guid;

        lazy.value
            .then((guid) => firstValue = guid)
            .then(() =>
            {
                assert.isTrue(lazy.isValueCreated);

                lazy.value
                    .then((guid) => secondValue = guid)
                    .then(() => assert.equal(firstValue.toString(), secondValue.toString()));
            });
    });
});
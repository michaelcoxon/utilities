import { expect, assert } from 'chai';
import 'mocha';
import { AsyncWrapper } from '../src/AsyncWrapper';
import { Promises } from '../src/Promises';

describe("AsyncWrapper.construct", () =>
{
    it("should construct (default)", () =>
    {
        const actual = new AsyncWrapper();

        assert.isFalse(actual.complete);
        assert.isUndefined(actual.error);
        assert.isUndefined(actual.promise);
        assert.isFalse(actual.success);
        assert.isUndefined(actual.value);
    });

    it("should construct (promise)", async () =>
    {
        const actual = new AsyncWrapper(new Promise<number>((resolve, reject) => resolve(1)));

        assert.isTrue(actual.promise !== undefined);

        await actual.promise;

        assert.isTrue(actual.complete);
        assert.isUndefined(actual.error);
        assert.isTrue(actual.success);
        assert.equal(actual.value, 1);
    });

    it("should construct (value)", async () =>
    {
        const actual = new AsyncWrapper(1);

        assert.isTrue(actual.promise !== undefined);

        await actual.promise;

        assert.isTrue(actual.complete);
        assert.isUndefined(actual.error);
        assert.isTrue(actual.success);
        assert.equal(actual.value, 1);
    });

    it("should construct (value factory)", async () =>
    {
        const actual = new AsyncWrapper<number>(() => 1);

        assert.isTrue(actual.promise !== undefined);

        await actual.promise;

        assert.isTrue(actual.complete);
        assert.isUndefined(actual.error);
        assert.isTrue(actual.success);
        assert.equal(actual.value, 1);
    });

    it("should construct (promise factory)", async () =>
    {
        const actual = new AsyncWrapper<number>(() => new Promise<number>((resolve, reject) => resolve(1)));

        assert.isTrue(actual.promise !== undefined);

        await actual.promise;

        assert.isTrue(actual.complete);
        assert.isUndefined(actual.error);
        assert.isTrue(actual.success);
        assert.equal(actual.value, 1);
    });

    it("should construct (callback)", () =>
    {
        const actual = new AsyncWrapper<number>(undefined, p => assert.fail());

        assert.isFalse(actual.complete);
        assert.isUndefined(actual.error);
        assert.isUndefined(actual.promise);
        assert.isFalse(actual.success);
        assert.isUndefined(actual.value);
    });

    it("should construct (promise, callback)", (done) =>
    {
        const actual = new AsyncWrapper(new Promise<number>((resolve, reject) => resolve(1)), p =>
        {
            assert.isTrue(p.promise !== undefined);
            assert.isTrue(p.complete);
            assert.isUndefined(p.error);
            assert.isTrue(p.success);
            assert.equal(p.value, 1);

            done();
        });
    });

    it("should construct (value, callback)", (done) =>
    {
        const actual = new AsyncWrapper(1, p =>
        {
            assert.isTrue(p.promise !== undefined);
            assert.isTrue(p.complete);
            assert.isUndefined(p.error);
            assert.isTrue(p.success);
            assert.equal(p.value, 1);

            done();
        });
    });

    it("should construct (value factory, callback)", (done) =>
    {
        const actual = new AsyncWrapper<number>(() => 1, p =>
        {
            assert.isTrue(p.promise !== undefined);
            assert.isTrue(p.complete);
            assert.isUndefined(p.error);
            assert.isTrue(p.success);
            assert.equal(p.value, 1);

            done();
        });
    });

    it("should construct (promise factory, callback)", (done) =>
    {
        const actual = new AsyncWrapper<number>(() => new Promise<number>((resolve, reject) => resolve(1)), p =>
        {
            assert.isTrue(p.promise !== undefined);
            assert.isTrue(p.complete);
            assert.isUndefined(p.error);
            assert.isTrue(p.success);
            assert.equal(p.value, 1);

            done();
        });
    });
});

describe("AsyncWrapper", () =>
{
    it("should ignore the current promise if updated", (done) =>
    {
        const actual = new AsyncWrapper<number>(new Promise<number>(
            async resolve =>
            {
                await Promises.delay(1000);
                resolve(1);
            }),
            p =>
            {
                if (p.value !== 2)
                {
                    assert.fail()
                }

                done();
            });

        actual.update(new Promise<number>(async resolve =>
        {
            await Promises.delay(2000);
            resolve(2);
        }));
    })
        .timeout(3000);
});
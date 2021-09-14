import { AsyncWrapper, delay } from '../../src';

describe("AsyncWrapper.construct", () =>
{
    it("should construct (default)", () =>
    {
        const actual = new AsyncWrapper();

        expect(!actual.complete);
        expect(actual.error).toBeUndefined();
        expect(!actual.success);
        expect(actual.value).toBeUndefined();
    });

    it("should construct (promise)", async () =>
    {
        const actual = new AsyncWrapper(new Promise<number>((resolve) => resolve(1)));

        expect(actual.promise !== undefined);

        await actual.promise;

        expect(actual.complete);
        expect(actual.error).toBeUndefined();
        expect(actual.success);
        expect(actual.value).toEqual(1);
    });

    it("should construct (value)", async () =>
    {
        const actual = new AsyncWrapper(1);

        expect(actual.promise !== undefined);

        await actual.promise;

        expect(actual.complete);
        expect(actual.error).toBeUndefined();
        expect(actual.success);
        expect(actual.value).toEqual(1);
    });

    it("should construct (value factory)", async () =>
    {
        const actual = new AsyncWrapper<number>(() => 1);

        expect(actual.promise !== undefined);

        await actual.promise;

        expect(actual.complete);
        expect(actual.error).toBeUndefined();
        expect(actual.success);
        expect(actual.value).toEqual(1);
    });

    it("should construct (promise factory)", async () =>
    {
        const actual = new AsyncWrapper<number>(() => new Promise<number>((resolve) => resolve(1)));

        expect(actual.promise !== undefined);

        await actual.promise;

        expect(actual.complete);
        expect(actual.error).toBeUndefined();
        expect(actual.success);
        expect(actual.value).toEqual(1);
    });

    it("should construct (callback)", () =>
    {
        const actual = new AsyncWrapper<number>(undefined, () => fail());

        expect(!actual.complete);
        expect(actual.error).toBeUndefined();
        expect(!actual.success);
        expect(actual.value).toBeUndefined();
    });

    it("should construct (promise, callback)", (done) =>
    {
        new AsyncWrapper(new Promise<number>((resolve) => resolve(1)), p =>
        {
            expect(p.promise !== undefined);
            expect(p.complete);
            expect(p.error).toBeUndefined();
            expect(p.success);
            expect(p.value).toEqual(1);

            done();
        });
    });

    it("should construct (value, callback)", (done) =>
    {
        new AsyncWrapper(1, p =>
        {
            expect(p.promise !== undefined);
            expect(p.complete);
            expect(p.error).toBeUndefined();
            expect(p.success);
            expect(p.value).toEqual(1);

            done();
        });
    });

    it("should construct (value factory, callback)", (done) =>
    {
        new AsyncWrapper<number>(() => 1, p =>
        {
            expect(p.promise !== undefined);
            expect(p.complete);
            expect(p.error).toBeUndefined();
            expect(p.success);
            expect(p.value).toEqual(1);

            done();
        });
    });

    it("should construct (promise factory, callback)", (done) =>
    {
        new AsyncWrapper<number>(() => new Promise<number>((resolve) => resolve(1)), p =>
        {
            expect(p.promise !== undefined);
            expect(p.complete);
            expect(p.error).toBeUndefined();
            expect(p.success);
            expect(p.value).toEqual(1);

            done();
        });
    });
});

describe("AsyncWrapper", () =>
{
    it("should ignore the current promise if updated", (done) =>
    {
        const actual = new AsyncWrapper<number>(new Promise<number>(
            resolve =>
            {
                delay(1000).then(() => resolve(1));
            }),
            p =>
            {
                if (p.value !== 2)
                {
                    fail();
                }

                done();
            });

        actual.update(new Promise<number>(resolve =>
        {
            delay(2000).then(() => resolve(2));
        }));
    }, 3000);
});
import assert, { throws } from 'assert';
import expire from './expire';
import MemoryCache from './MemoryCache';

describe("MemoryCache.constructor", () =>
{
    it("should construct", () =>
    {
        const subject = new MemoryCache();
        expect(subject).not.toBeNull();
    });
});

describe("MemoryCache.add", () =>
{
    it("should add an item", async () =>
    {
        const subject = new MemoryCache();

        subject.add('key', 'value', expire.never);

        expect(await subject.getAsync('key')).not.toBeNull();
        expect(await subject.getAsync('key')).toEqual('value');
    });
});


describe("MemoryCache + expire", () =>
{
    it("should expire immediately", async () =>
    {
        const subject = new MemoryCache();

        subject.add('key', 'value', expire.now);

        try
        {
            await subject.getAsync('key');
            assert.fail();
        }
        catch (err)
        {
            ;
        }
    });

    it("should expire tomorrow", async () =>
    {
        const subject = new MemoryCache();

        subject.add('key', 'value', expire.tomorrow());
        expect(await subject.getAsync('key')).toEqual('value');
    });

});
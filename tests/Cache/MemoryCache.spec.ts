import { fail, throws } from 'assert';
import { KeyNotFoundException } from '../../src';
import expire from '../../src/Cache/expire';
import MemoryCache from '../../src/Cache/MemoryCache';


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

        subject.add('key', 'value', () => false);

        expect(await subject.getAsync('key')).not.toBeNull();
        expect(await subject.getAsync('key')).toEqual('value');
    });
});


describe("MemoryCache + expire", () =>
{
    it("should expire immediately", async () =>
    {
        const subject = new MemoryCache();

        subject.add('key', 'value', expire());

        try
        {
            await subject.getAsync('key');
        }
        catch (ex)
        {
            expect(ex).toBeInstanceOf(KeyNotFoundException);
        }
    });

    it("should expire tomorrow", async () =>
    {
        const subject = new MemoryCache();

        subject.add('key', 'value', expire.tomorrow());
        expect(await subject.getAsync('key')).toEqual('value');
    });

});
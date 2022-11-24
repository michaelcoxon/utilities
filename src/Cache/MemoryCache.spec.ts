import Exception from '../Exceptions/Exception.js';
import KeyNotFoundException from '../Exceptions/KeyNotFoundException.js';
import expire from './expire.js';
import MemoryCache from './MemoryCache.js';

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
            console.error(ex);
            expect(ex).toBeInstanceOf(KeyNotFoundException);
            expect((ex as Exception).message).toEqual("Key 'key' is not found");
        }
    });

    it("should expire tomorrow", async () =>
    {
        const subject = new MemoryCache();

        subject.add('key', 'value', expire.tomorrow());
        expect(await subject.getAsync('key')).toEqual('value');
    });

});
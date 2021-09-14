import { Dictionary } from '../../src';

describe("Dictionary.constructor", () =>
{
    it("should return a Dictionary", () =>
    {
        const kvps = [
            { key: 'name', value: 'michael' },
            { key: 'age', value: 35 }
        ];
        const result = new Dictionary<string, unknown>(kvps);

        expect(kvps.length).toEqual(result.length);

        for (const key of result.keys)
        {
            expect(kvps.find(kvp => kvp.key == key)?.value).toEqual(result.itemByKey(key));
        }
    });

    it("should iterate a Dictionary with for(..of..)", () =>
    {
        const kvps = [
            { key: 'name', value: 'michael' },
            { key: 'age', value: 35 }
        ];
        const result = new Dictionary<string, unknown>(kvps);

        expect(kvps.length).toEqual(result.length);

        for (const kvp of result)
        {
            expect(kvps.find(i => i.key == kvp.key)?.value).toEqual(kvp.value);
        }
    });
});

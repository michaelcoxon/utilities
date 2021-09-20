import Guid from '../src/Guid';

describe("Guid.newGuid", () =>
{
    it("should return a new guid", () =>
    {
        const actual = Guid.newGuid();

        expect(actual).not.toBeNull();
    });



    it("should return a new guid every time", (done) =>
    {
        const guids: string[] = [];

        for (let i = 0; i < 100/*0000*/; i++)
        {
            guids.push(Guid.newGuid().toString());
        }

        const uniqueValues: Record<string, boolean> = {};

        for (const guid of guids)
        {
            if (uniqueValues[guid] === undefined)
            {
                uniqueValues[guid] = true;
            }
            else
            {
                fail(`guid ${guid} not unique`);
            }
        }

        expect(guids.length).toEqual(Object.keys(uniqueValues).length);

        done();
    }, 0);

});

describe("Guid.parseString", () =>
{
    it("should return the same guid", () =>
    {
        const guid = Guid.newGuid();
        const newGuid = Guid.parseString(guid.toString());

        expect(newGuid.toString()).toEqual(guid.toString());
    });

    it("should return the same guid every time", (done) =>
    {
        const guids: Guid[] = [];

        for (let i = 0; i < 100/*0000*/; i++)
        {
            guids.push(Guid.newGuid());
        }

        for (const guid of guids)
        {
            const newGuid = Guid.parseString(guid.toString());

            expect(newGuid.toString()).toEqual(guid.toString());
        }

        done();
    },0);

});
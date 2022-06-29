import Guid from '../src/Guid';
import { UnsignedInt32 } from '../src/Numbers';
import 'jest';

describe("Guid.newGuid", () =>
{
    it("should return a new guid", () =>
    {
        const actual = Guid.newGuid();

        expect(actual).not.toBeNull();
    });

    it("should return v4 guids", () =>
    {
        const actual = Guid.newGuid();

        expect(actual.toString()[14]).toEqual('4');
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
                throw `guid ${guid} not unique`;
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
    }, 0);

});

describe("Guid.equals", () =>
{
    it("should return true", () =>
    {
        const empty = Guid.empty;
        const newGuid = new Guid();

        expect(newGuid).toEqual(empty);
    });

    it("should return false", () =>
    {
        const empty = Guid.empty;
        const newGuid = new Guid(new UnsignedInt32(1));

        expect(newGuid).not.toEqual(empty);
    });

    it("should return true", () =>
    {
        const actual = Guid.parseString("123e4567-e89b-12d3-a456-426614174000");
        const result = Guid.parseString("123e4567-e89b-12d3-a456-426614174000");

        expect(result).toEqual(actual);
    });
});
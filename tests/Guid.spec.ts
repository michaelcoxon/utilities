import { Guid } from '../src/Guid';
import { expect, assert } from 'chai';
import 'mocha';


describe("Guid.newGuid", () =>
{
    it("should return a new guid", () =>
    {
        const actual = Guid.newGuid();

        assert.isNotNull(actual);
    });

    it("should return a new guid every time", (done) =>
    {        
        const guids: string[] = [];

        for (let i = 0; i < 1000000; i++)
        {
            guids.push(Guid.newGuid().toString());
        }

        const uniqueValues: { [key: string]: boolean } = {};

        for (let guid of guids)
        {
            if (uniqueValues[guid] === undefined)
            {
                uniqueValues[guid] = true;
            }
            else
            {
                assert.fail(guid, "", `guid ${guid} not unique`);
            }            
        }

        assert.equal(guids.length, Object.keys(uniqueValues).length);

        done();
    })
        .timeout(0);
});
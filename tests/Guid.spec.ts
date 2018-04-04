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
});
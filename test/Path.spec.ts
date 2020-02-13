import { Path } from '../src/Path';
import { expect, assert } from 'chai';
import 'mocha';


describe("Path.combine", () =>
{
    it("should return a combined path", () =>
    {
        const components = ["path", "to", "file"]
        const expect = "path/to/file";
        const actual = Path.combine(...components);

        assert.equal(actual, expect);
    });
});
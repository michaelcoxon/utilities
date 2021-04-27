import Result from '../src/Result';


import { expect, assert } from 'chai';
import 'mocha';


describe("Result.ok", () =>
{
    it("should return success", () =>
    {
        const result = Result.ok(2);



        assert.isTrue(result.success);
        assert.equal(result.value, 2);
    });
});

describe("Result.fail", () =>
{
    it("should return not success", () =>
    {
        const result = Result.fail("message", 2);



        assert.isFalse(result.success);
        assert.equal(result.value, 2);
        assert.equal(result.error, "message");
    });
});
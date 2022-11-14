import Result from '../src/Result/Result.js';

describe("Result.ok", () =>
{
    it("should return success", () =>
    {
        const result = Result.ok(2);



        expect(result.success);
        expect(result.value).toEqual(2);
    });
});

describe("Result.fail", () =>
{
    it("should return not success", () =>
    {
        const result = Result.fail("message", 2);



        expect(!result.success);
        expect(result.value).toEqual(2);
        expect(result.error).toEqual("message");
    });
});
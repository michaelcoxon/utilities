import  average  from './average';

describe("average", () =>
{
    it("should return the average of the numbers", () =>
    {
        const subject = [1, 2, 3];
        const actual = average(subject);

        expect(actual).toEqual(2);
    });

    it("should return 0", () =>
    {
        const subject = [];
        const actual = average(subject);

        expect(actual).toEqual(0);
    });
});

import StringFormatter from './StringFormatter';


describe("StringFormatter.format", () =>
{
    it("should return the same", () =>
    {
        const subject = new StringFormatter();
        const expected = "aaSdf";
        const actual = subject.format("aaSdf");

        expect(actual).toEqual(expected);

    });
    
    it("should return lowercase", () =>
    {
        const subject = new StringFormatter();
        const expected = "aasdf";
        const actual = subject.format("aaSdf", "L");

        expect(actual).toEqual(expected);

    });

    it("should return uppercase", () =>
    {
        const subject = new StringFormatter();
        const expected = "AASDF";
        const actual = subject.format("aaSdf", "U");

        expect(actual).toEqual(expected);

    });
});

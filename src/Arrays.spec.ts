import average from './Arrays/average';
import range from './Arrays/range';
import sequenceEqual from './Arrays/sequenceEqual';
import sum from './Arrays/sum';

describe("Arrays.average", () =>
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

describe("Arrays.sequenceEqual", () =>
{
    it("should return true because the sequence is the same", () =>
    {
        const subject_1 = [1, 2, 3];
        const actual = sequenceEqual(subject_1, subject_1);

        expect(actual);
    });
    
    it("should return true because the sequence is equal", () =>
    {
        const subject_1 = [1, 2, 3];
        const subject_2 = [1, 2, 3];
        const actual = sequenceEqual(subject_1, subject_2);

        expect(actual);
    });

    it("should return false because the sequence is not the same", () =>
    {
        const subject_1 = [1, 2, 3];
        const subject_2 = [1, 1, 3];
        const actual = sequenceEqual(subject_1, subject_2);

        expect(!actual);
    });
    it("should return false because the sequences are different lengths", () =>
    {
        const subject_1 = [1, 2, 3];
        const subject_2 = [1, 2];
        const actual = sequenceEqual(subject_1, subject_2, true);

        expect(!actual);
    });

    it("should return false because a sequence is undefined", () =>
    {
        const subject_1 = [1, 2, 3];
        const subject_2 = undefined as unknown;
        const actual = sequenceEqual(subject_1, subject_2 as [], true);

        expect(!actual);
    });

    it("should return true because the sequence in any order is the same", () =>
    {
        const subject_1 = [1, 2, 3];
        const subject_2 = [1, 2, 3];
        const actual = sequenceEqual(subject_1, subject_2, true);

        expect(actual);
    });

    it("should return false because the sequence any order is not the same", () =>
    {
        const subject_1 = [1, 2, 3];
        const subject_2 = [1, 1, 3];
        const actual = sequenceEqual(subject_1, subject_2, true);

        expect(!actual);
    });
});

describe("Arrays.range", () =>
{
    it("should return an array from 0 to 9", () =>
    {
        const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const actual = range(0, 10);
        expect(actual).toEqual(expected);
    });
});

describe("Arrays.sum", () =>
{
    it("should return 10", () => 
    {
        const expected = 10;
        const actual = sum([1, 9]);
        expect(actual).toEqual(expected);
    });
});
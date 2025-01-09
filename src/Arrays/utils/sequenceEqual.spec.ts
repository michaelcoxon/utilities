import sequenceEqual from './sequenceEqual';

describe("sequenceEqual", () =>
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
        const actual = sequenceEqual(subject_1, subject_2);

        expect(!actual);
    });

    it("should return false because a sequence is undefined", () =>
    {
        const subject_1 = [1, 2, 3];
        const subject_2 = undefined as unknown;
        const actual = sequenceEqual(subject_1, subject_2 as []);

        expect(!actual);
    });

    it("should return true because the sequence is the same", () =>
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
});

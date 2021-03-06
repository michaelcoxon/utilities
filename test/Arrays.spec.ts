import { expect, assert } from 'chai';
import 'mocha';
import { slowtest } from './_env';
import { Arrays } from '../src/Arrays';

describe("Arrays.average", () =>
{
    it("should return the average of the numbers", () =>
    {
        const subject = [1,2,3];
        const actual = Arrays.average(subject);

        expect(2).to.equal(actual);
    });

    it("should return the average of the numbers (spread)", () =>
    {
        const actual = Arrays.average(1,2,3);

        expect(2).to.equal(actual);
    });
});

describe("Arrays.isNullOrEmpty", () =>
{
    it("should return true because the array is null", () =>
    {
        const actual = Arrays.isNullOrEmpty(null);
        assert.isTrue(actual)
    });

    it("should return true because the array is empty", () =>
    {
        const actual = Arrays.isNullOrEmpty([]);
        assert.isTrue(actual)
    });

    it("should return false because the array is not null", () =>
    {
        const actual = Arrays.isNullOrEmpty([1]);
        assert.isFalse(actual)
    });

    it("should return false because the array is not empty", () =>
    {
        const actual = Arrays.isNullOrEmpty([1]);
        assert.isFalse(actual)
    });
});

describe("Arrays.sequenceEqual", () =>
{
    it("should return true because the sequence is the same", () =>
    {
        const subject_1 = [1,2,3];
        const subject_2 = [1,2,3];
        const actual = Arrays.sequenceEqual(subject_1, subject_2);

        assert.isTrue(actual);
    });

    it("should return false because the sequence is the same", () =>
    {
        const subject_1 = [1,2,3];
        const subject_2 = [1,1,3];
        const actual = Arrays.sequenceEqual(subject_1, subject_2);

        assert.isFalse(actual);
    });
});

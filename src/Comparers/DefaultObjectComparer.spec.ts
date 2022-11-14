import DefaultObjectComparer from './DefaultObjectComparer.js';

describe("DefaultObjectComparer.compare", () =>
{
    it("should equal 1", () =>
    {
        const x = 'bcd';
        const y = 'abc';
        const comparer = new DefaultObjectComparer();

        const result = comparer.compare(x, y);

        expect(1).toEqual(result);
    });

    it("should equal 0", () =>
    {
        const x = 'abc';
        const y = 'abc';
        const comparer = new DefaultObjectComparer();

        const result = comparer.compare(x, y);

        expect(0).toEqual(result);
    });

    it("should equal -1", () =>
    {
        const x = 'abc';
        const y = 'bcd';
        const comparer = new DefaultObjectComparer();

        const result = comparer.compare(x, y);

        expect(-1).toEqual(result);
    });
});

describe("DefaultObjectComparer.equals", () =>
{
    it("should be equal", () =>
    {
        const x = 'abc';
        const y = 'abc';
        const comparer = new DefaultObjectComparer();

        const result = comparer.equals(x, y);

        expect(true).toEqual(result);
    });

    it("should not be equal", () =>
    {
        const x = 'abc';
        const y = 'cba';
        const comparer = new DefaultObjectComparer();

        const result = comparer.equals(x, y);

        expect(false).toEqual(result);
    });
});

describe("DefaultObjectComparer.greaterThan", () =>
{
    it("should be greater than", () =>
    {
        const x = 'bcd';
        const y = 'abc';
        const comparer = new DefaultObjectComparer();

        const result = comparer.greaterThan(x, y);

        expect(true).toEqual(result);
    });

    it("should not be greater than", () =>
    {
        const x = 'abc';
        const y = 'bcd';
        const comparer = new DefaultObjectComparer();

        const result = comparer.greaterThan(x, y);

        expect(false).toEqual(result);
    });

    it("should not be greater than (equal)", () =>
    {
        const x = 'abc';
        const y = 'abc';
        const comparer = new DefaultObjectComparer();

        const result = comparer.greaterThan(x, y);

        expect(false).toEqual(result);
    });
});

describe("DefaultObjectComparer.greaterThanOrEqual", () =>
{
    it("should be greater than or equal", () =>
    {
        const x = 'bcd';
        const y = 'abc';
        const comparer = new DefaultObjectComparer();

        const result = comparer.greaterThanOrEqual(x, y);

        expect(true).toEqual(result);
    });

    it("should not be greater than or equal", () =>
    {
        const x = 'abc';
        const y = 'bcd';
        const comparer = new DefaultObjectComparer();

        const result = comparer.greaterThanOrEqual(x, y);

        expect(false).toEqual(result);
    });

    it("should be greater than or equal (equal)", () =>
    {
        const x = 'abc';
        const y = 'abc';
        const comparer = new DefaultObjectComparer();

        const result = comparer.greaterThanOrEqual(x, y);

        expect(true).toEqual(result);
    });
});

describe("DefaultObjectComparer.lessThan", () =>
{
    it("should not be less than", () =>
    {
        const x = 'bcd';
        const y = 'abc';
        const comparer = new DefaultObjectComparer();

        const result = comparer.lessThan(x, y);

        expect(false).toEqual(result);
    });

    it("should be less than", () =>
    {
        const x = 'abc';
        const y = 'bcd';
        const comparer = new DefaultObjectComparer();

        const result = comparer.lessThan(x, y);

        expect(true).toEqual(result);
    });

    it("should not be less than (equal)", () =>
    {
        const x = 'bcd';
        const y = 'bcd';
        const comparer = new DefaultObjectComparer();

        const result = comparer.lessThan(x, y);

        expect(false).toEqual(result);
    });
});

describe("DefaultObjectComparer.lessThanOrEqual", () =>
{
    it("should not be less than or equal", () =>
    {
        const x = 'bcd';
        const y = 'abc';
        const comparer = new DefaultObjectComparer();

        const result = comparer.lessThanOrEqual(x, y);

        expect(false).toEqual(result);
    });

    it("should be less than or equal", () =>
    {
        const x = 'abc';
        const y = 'bcd';
        const comparer = new DefaultObjectComparer();

        const result = comparer.lessThanOrEqual(x, y);

        expect(true).toEqual(result);
    });

    it("should be less than or equal (equal)", () =>
    {
        const x = 'abc';
        const y = 'abc';
        const comparer = new DefaultObjectComparer();

        const result = comparer.lessThanOrEqual(x, y);

        expect(true).toEqual(result);
    });
});

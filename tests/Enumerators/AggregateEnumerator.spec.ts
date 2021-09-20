import { Collection } from '../../src/Enumerables';
import AggregateEnumerator from '../../src/Enumerators/AggregateEnumerator';
import isNumber from '../../src/TypeHelpers/isNumber';

describe("AggregateEnumerator.constructor", () =>
{
    it("should return an enumerator from a collection", () =>
    {
        const array1 = [1, 2, 3, 4];
        const expected = [1, 3, 6, 10];
        const coll1 = new Collection<number>(array1);
        const en = new AggregateEnumerator(coll1.getEnumerator(), (a, c) => a + c, 0);

        let count = 0;

        while (en.moveNext())
        {
            expect(expected[count]).toEqual(en.current);
            count++;
        }
    });

    it("should return an enumerator from a collection dev should handle nulls or use initialValue", () =>
    {
        const array1 = [1, 2, 3, 4];
        const expected = [1, 3, 6, 10];
        const coll1 = new Collection<number>(array1);
        const en = new AggregateEnumerator(coll1.getEnumerator(), (a, c) => isNumber(a) ? a + c : c);

        let count = 0;

        while (en.moveNext())
        {
            expect(expected[count]).toEqual(en.current);
            count++;
        }
    });
});

describe("AggregateEnumerator.peek", () =>
{
    it("should return the next item in the enumerator without advancing", () =>
    {
        const array1 = [1, 2, 3, 4];
        const expected = [1, 3, 6, 10];
        const coll1 = new Collection<number>(array1);
        const en = new AggregateEnumerator(coll1.getEnumerator(), (a, c) => a + c, 0);

        let count = 0;

        expect(1).toEqual(en.peek());

        while (en.moveNext())
        {
            expect(expected[count]).toEqual(en.current);
            count++;
        }
    });

    it("should throw an execption when cannot peek", () =>
    {
        const array1 = [1, 2, 3, 4];
        const expected = [1, 3, 6, 10];
        const coll1 = new Collection<number>(array1);
        const en = new AggregateEnumerator(coll1.getEnumerator(), (a, c) => a + c, 0);

        let count = 0;

        while (en.moveNext())
        {
            expect(expected[count]).toEqual(en.current);
            count++;
        }
        try
        {
            en.peek();
            fail(); //assert.fail(undefined, undefined, "Should not be able to see past end of enumerable");
        } catch (ex) {
            //do nothing
         }
    });
});

describe("AggregateEnumerator.reset", () =>
{
    it("should move to the start of the enumerator", () =>
    {
        const array1 = [1, 2, 3, 4];
        const expected = [1, 3, 6, 10];
        const coll1 = new Collection<number>(array1);
        const en = new AggregateEnumerator(coll1.getEnumerator(), (a, c) => a + c, 0);

        let count = 0;

        while (en.moveNext())
        {
            expect(expected[count]).toEqual(en.current);
            count++;
        }

        en.reset();

        count = 0;

        while (en.moveNext())
        {
            expect(expected[count]).toEqual(en.current);
            count++;
        }
    });
});
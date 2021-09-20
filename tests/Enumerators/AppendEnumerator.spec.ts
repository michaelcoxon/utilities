﻿import { Collection } from '../../src/Enumerables';
import AppendEnumerator from '../../src/Enumerators/AppendEnumerator';

describe("AppendEnumerator.constructor", () =>
{
    it("should return an enumerator from a collection", () =>
    {
        const array1 = [1, 2, 3, 4];
        const array2 = [5, 6, 7];
        const expected = [1, 2, 3, 4, 5, 6, 7];
        const coll1 = new Collection(array1);
        const coll2 = new Collection(array2);
        const en = new AppendEnumerator(coll1.getEnumerator(), coll2.getEnumerator());

        let count = 0;

        while (en.moveNext())
        {
            expect(expected[count]).toEqual(en.current);
            count++;
        }
    });
});

describe("AppendEnumerator.peek", () =>
{
    it("should return the next item in the enumerator without advancing", () =>
    {
        const array1 = [1, 2, 3, 4];
        const array2 = [5, 6, 7];
        const expected = [1, 2, 3, 4, 5, 6, 7];
        const coll1 = new Collection(array1);
        const coll2 = new Collection(array2);
        const en = new AppendEnumerator(coll1.getEnumerator(), coll2.getEnumerator());

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
        const array2 = [5, 6, 7];
        const expected = [1, 2, 3, 4, 5, 6, 7];
        const coll1 = new Collection(array1);
        const coll2 = new Collection(array2);
        const en = new AppendEnumerator(coll1.getEnumerator(), coll2.getEnumerator());

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
        } catch (ex)
        {
            // do nothing
        }
    });
});

describe("AppendEnumerator.reset", () =>
{
    it("should move to the start of the enumerator", () =>
    {
        const array1 = [1, 2, 3, 4];
        const array2 = [5, 6, 7];
        const expected = [1, 2, 3, 4, 5, 6, 7];
        const coll1 = new Collection(array1);
        const coll2 = new Collection(array2);
        const en = new AppendEnumerator(coll1.getEnumerator(), coll2.getEnumerator());

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

// describe("AppendEnumerator throw NullReferenceException", () =>
// {
//     it("should throw NullReferenceException", () =>
//     {
//         const array1 = [1, 2, 3, 4];
//         const array2 = [5, 6, 7];
//         const expected = [1, 2, 3, 4, 5, 6, 7];
//         const coll1 = new Collection(array1);
//         const coll2 = new Collection(array2);
//         const en = new AppendEnumerator(coll1.getEnumerator(), coll2.getEnumerator());

//         assert.throws(() =>
//         {
//             en.current;
//         },
//         NullReferenceException);
//     });
// });
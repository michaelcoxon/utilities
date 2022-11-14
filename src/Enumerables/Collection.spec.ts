﻿import { Collection } from './index.js';
import Exception from '../Exceptions/Exception.js';

describe("Collection.constructor", () =>
{
    it("should return a collection with the array items in the same order", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new Collection(array);

        expect(array.length).toEqual(result.length);

        for (let i = 0; i < result.length; i++)
        {
            expect(array[i]).toEqual(result.item(i));
        }
    });

    it("should return a collection with the collection items in the same order", () =>
    {
        const collection = new Collection([1, 2, 3, 4]);
        const result = new Collection(collection);

        expect(collection.length).toEqual(result.length);

        for (let i = 0; i < result.length; i++)
        {
            expect(collection.item(i)).toEqual(result.item(i));
        }
    });
});


describe("Collection.copyTo", () =>
{
    it("should return a collection the items appended to another collection", () =>
    {
        const coll1 = new Collection([1, 2, 3, 4]);
        const array = [-4, -3, -2, -1, 0];
        const expected = new Collection([1, 2, 3, 4, 0]);

        coll1.copyTo(array, 0);

        for (let i = 0; i < expected.length; i++)
        {
            expect(expected.item(i)).toEqual(array[i]);
        }
    });

    it("should throw an exception when the collection is larger than the array", (done) =>
    {
        const coll1 = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const array = [-4, -3, -2, -1, 0];

        expect(coll1.length == 9);
        expect(array.length == 5);

        try
        {
            coll1.copyTo(array, 0);
            fail("did not throw");
        }
        catch (ex)
        {
            if (!((ex as Exception).name == 'ArgumentException'))
            {
                fail(ex);
            }
        }
        done();
    });

    it("should throw an exception when the index is set to a position that the collection cannot fit in", (done) =>
    {
        const coll1 = new Collection([1, 2, 3, 4]);
        const array = [-4, -3, -2, -1, 0];
        
        try
        {
            coll1.copyTo(array, 2);
            fail("did not throw");
        }
        catch (ex)
        {
            if (!((ex as Exception).name == 'ArgumentException'))
            {
                fail(ex);
            }
        }
        done();
    });
});


describe("Collection.forEach", () =>
{
    it("should iterate over all items in a collection", () =>
    {
        const array = [1, 2, 3, 4];
        const coll1 = new Collection(array);

        let count = 0;

        coll1.forEach((value, index) =>
        {
            expect(array[index]).toEqual(value);
            expect(coll1.item(index)).toEqual(value);
            count++;
        });

        expect(array.length).toEqual(count);
    });

    it("should iterate over items in a collection and break on return false", () =>
    {
        const array = [1, 2, 3, 4];
        const coll1 = new Collection(array);

        let count = 0;

        coll1.forEach((value) =>
        {
            if (value === 3)
            {
                return false;
            }
            count++;
        });

        expect(2).toEqual(count);
    });
});




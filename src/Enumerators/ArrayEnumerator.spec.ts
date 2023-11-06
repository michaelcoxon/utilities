﻿import { throws } from 'assert';
import { Collection } from '../../src/Enumerables';
import ArrayEnumerator from '../../src/Enumerators/ArrayEnumerator';

describe("ArrayEnumerator.constructor", () =>
{
    it("should return an enumerator from a collection", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new ArrayEnumerator(coll.toArray());

        let count = 0;

        while (en.moveNext())
        {
            expect(coll.item(count)).toEqual(en.current);
            count++;
        }
    });

    it("should return an enumerator from an array", () =>
    {
        const array = [1, 2, 3, 4];
        const en = new ArrayEnumerator(array);

        let count = 0;

        while (en.moveNext())
        {
            expect(array[count]).toEqual(en.current);
            count++;
        }
    });

    it("should return an enumerator using the method on an ArrayEnumerator", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = coll.getEnumerator();

        let count = 0;

        while (en.moveNext())
        {
            expect(coll.item(count)).toEqual(en.current);
            count++;
        }
    });
});

describe("ArrayEnumerator.moveNext", () =>
{
    it("should move to the next item in the enumerator", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new ArrayEnumerator(coll.toArray());

        let count = 0;

        while (en.moveNext())
        {
            expect(coll.item(count)).toEqual(en.current);
            count++;
        }
    });

    it("should return false when moving past the end of the enumerator", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new ArrayEnumerator(coll.toArray());

        let count = 0;

        while (en.moveNext())
        {
            expect(coll.item(count)).toEqual(en.current);
            count++;
        }

        expect(false).toEqual(en.moveNext());
    });
});

describe("ArrayEnumerator.peek", () =>
{
    it("should return the next item in the enumerator without advancing", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new ArrayEnumerator(coll.toArray());

        let count = 0;

        expect(1).toEqual(en.peek());

        while (en.moveNext())
        {
            expect(coll.item(count)).toEqual(en.current);
            count++;
        }
    });

    it("should throw an execption when cannot peek", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new ArrayEnumerator(coll.toArray());

        let count = 0;

        while (en.moveNext())
        {
            expect(coll.item(count)).toEqual(en.current);
            count++;
        }
        try
        {
            en.peek();
            fail("Should not be able to see past end of enumerable");
        } catch (ex) { /**/ }
    });
});

describe("ArrayEnumerator.reset", () =>
{
    it("should move to the start of the enumerator", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new ArrayEnumerator(coll.toArray());

        let count = 0;

        while (en.moveNext())
        {
            expect(coll.item(count)).toEqual(en.current);
            count++;
        }

        en.reset();

        count = 0;

        while (en.moveNext())
        {
            expect(coll.item(count)).toEqual(en.current);
            count++;
        }
    });
});

describe("ArrayEnumerator.throwOutOfBoundsException", () =>
{
    it("should throw OutOfBoundsException", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new ArrayEnumerator(coll.toArray());

        throws(() =>
        {
            en.current;
        }, (e: Error) => e.name == "OutOfBoundsException");
    });
});

describe("ArrayEnumerator.Iterator", () =>
{
    it("should iterate", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new ArrayEnumerator(coll.toArray());

        let count = 0;

        let result = en.next();
        while (!result.done)
        {
            expect(coll.item(count)).toEqual(en.current);
            result = en.next();
            count++;
        }
    });
});
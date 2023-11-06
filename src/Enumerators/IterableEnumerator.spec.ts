import { throws } from 'assert';
import { Collection } from '../../src/Enumerables';
import IterableEnumerator from '../../src/Enumerators/IterableEnumerator';
import { NotImplementedException, NotSupportedException } from '../Exceptions';

describe("IterableEnumerator.constructor", () =>
{
    it("should return an enumerator from a collection", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new IterableEnumerator(coll.toArray());

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
        const en = new IterableEnumerator(array);

        let count = 0;

        while (en.moveNext())
        {
            expect(array[count]).toEqual(en.current);
            count++;
        }
    });

    it("should return an enumerator using the method on an IterableEnumerator", () =>
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

describe("IterableEnumerator.moveNext", () =>
{
    it("should move to the next item in the enumerator", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new IterableEnumerator(coll.toArray());

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
        const en = new IterableEnumerator(coll.toArray());

        let count = 0;

        while (en.moveNext())
        {
            expect(coll.item(count)).toEqual(en.current);
            count++;
        }

        expect(false).toEqual(en.moveNext());
    });
});

describe("IterableEnumerator.peek", () =>
{
    it("should return the next item in the enumerator without advancing", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new IterableEnumerator(coll.toArray());

        throws(() =>
        {
            en.peek();
        }, (e: Error) => e.name == "NotSupportedException");
    });

    it("should throw an exception when cannot peek", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new IterableEnumerator(coll.toArray());

        let count = 0;

        while (en.moveNext())
        {
            expect(coll.item(count)).toEqual(en.current);
            count++;
        }
        throws(() => en.peek(), "Should not be able to see past end of enumerable");
    });
});

describe("IterableEnumerator.reset", () =>
{
    it("should move to the start of the enumerator", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new IterableEnumerator(coll.toArray());

        throws(() =>
        {
            en.reset();
        }, (e: Error) => e.name == "NotSupportedException");
    });
});

describe("IterableEnumerator.throwOutOfBoundsException", () =>
{
    it("should throw OutOfBoundsException", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new IterableEnumerator(coll.toArray());

        throws(() =>
        {
            en.current;
        }, (e: Error) => e.name == "OutOfBoundsException");
    });
});

describe("IterableEnumerator.Iterator", () =>
{
    it("should iterate", () =>
    {
        const array = [1, 2, 3, 4];
        const coll = new Collection(array);
        const en = new IterableEnumerator(coll.toArray());

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
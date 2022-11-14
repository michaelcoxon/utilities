import { Enumerable } from './index.js';
import { getDefaultLogger } from '../Logging/defaultLogger.js';
import { ArrayEnumerable } from './ArrayEnumerable.js';

/*
setDefaultLogger(new ConsoleLogger(console, {
    loggingVerbosity: LogLevel.Trace,
    useTraceMethodForTraceLogLevel: false
}));
*/
const logger = getDefaultLogger();

describe("Enumerable", () =>
{
    it("should return a Enumerable with the array items in the same order", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(array.length).toEqual(result.count());

        for (let i = 0; i < result.count(); i++)
        {
            expect(result.item(i)).toEqual(array[i]);
        }
    });

    it("should return an Enumerable with the List items in the same order", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(array.length).toEqual(result.count());

        for (let i = 0; i < result.count(); i++)
        {
            expect(result.item(i)).toEqual(array[i]);
        }
    });

    it("should be able to be enumerated with for(..of..)", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(array.length).toEqual(result.count());
        let i = 0;
        for (const value of result)
        {
            expect(value).toEqual(array[i]);
            i++;
        }
        expect(i).toEqual(array.length);
    });

    it("should return an empty enumerable", () =>
    {
        const source = Enumerable.empty();

        expect(source.count()).toEqual(0);
    });
});

describe("Enumerable.all", () =>
{
    it("should return true if all items match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(result.all((i) => i > 0)).toEqual(true);
    });

    it("should return false if one item doesnt match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(result.all((i) => i > 1)).toEqual(false);
    });
});

describe("Enumerable.any", () =>
{
    it("should return true if the Enumerable has items", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(result.any()).toEqual(true);
    });

    it("should return false if the Enumerable is empty", () =>
    {
        const array = [];
        const result = new ArrayEnumerable(array);

        expect(result.any()).toEqual(false);
    });

    it("should return true if any of the items match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(result.any((i) => i === 2)).toEqual(true);
    });

    it("should return false if none of the items match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(result.any((i) => i === -1)).toEqual(false);
    });
});

describe("Enumerable.average", () =>
{
    it("should return the average of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);

        const result = query.average((i) => i);

        expect(result).toEqual(2.5);
    });
});

describe("Enumerable.count", () =>
{
    it("should return the number of items in the Enumerable", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);

        const result = query.count();

        expect(result).toEqual(4);
    });
});

describe("Enumerable.distinct", () =>
{
    it("should return only unique items in the collection", () =>
    {
        const array = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4];
        const query = new ArrayEnumerable(array);
        const expected = [1, 2, 3, 4];

        expect(query.count()).toEqual(array.length);

        const result = query.distinct((n) => n);

        expect(result.count()).toEqual(expected.length);

        for (let i = 0; i < result.count(); i++)
        {
            expect(result.item(i)).toEqual(expected[i]);
        }
    });
});

describe("Enumerable.first", () =>
{
    it("should return the first item in the Enumerable", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(result.first()).toEqual(1);
    });

    it("should return the first item in the Enumerable after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(result.first(i => i % 2 === 0)).toEqual(2);
    });

    it("should throw an exception if the Enumerable is empty", () =>
    {
        const array = [];
        const result = new ArrayEnumerable(array);

        try
        {
            result.first();
            fail();
        }
        catch (ex)
        {
            // do nothing
        }
    });
});

describe("Enumerable.firstOrDefault", () =>
{
    it("should return the first item in the Enumerable", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(result.firstOrDefault()).toEqual(1);
    });

    it("should return the first item in the Enumerable after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(result.firstOrDefault(i => i % 2 === 0)).toEqual(2);
    });

    it("should return null if the Enumerable is empty", () =>
    {
        const array = [];
        const result = new ArrayEnumerable(array);

        expect(result.firstOrDefault()).toEqual(null);
    });
});


// describe("Enumerable.join", () =>
// {
//     it("should return the items joined by the selector", () =>
//     {
//         const outer = [1, 2, 3, 4, 5, 6];
//         const inner = [2, 4, 6, 8];
//         const expected = [2, 4, 6];

//         const qOuter = new ArrayEnumerable(outer);
//         const qInner = new ArrayEnumerable(inner);

//         const outerKeySelector: (o: number) => number = o =>
//         {
//             console.log('o', o);
//             return o;
//         };
//         const innerKeySelector: (i: number) => number = i =>
//         {
//             console.log('i', i);
//             return i;
//         };
//         const resultSelector: (o: number, i: number) => { o: number, i: number; } = (o, i) =>
//         {
//             console.log('{o,i}', { o, i });
//             return { o, i };
//         };

//         const actual = qOuter.join(qInner, outerKeySelector, innerKeySelector, resultSelector)
//             .select(j => j.i)
//             .toArray();

//         console.log(actual);

//         expect(actual).toBe(expected);

//         //expect(result.count()).toEqual(expected.length);

//         // result.forEach(i => expect(i.i).toStrictEqual(i.o));
//     });
// });


describe("Enumerable.groupBy", () =>
{
    it("should return the items grouped by whether they are even or odd", () =>
    {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const query = new ArrayEnumerable(array);

        const result = query.groupBy(i => i % 2);

        expect(2).toEqual(result.count());

        const evens = result.where(g => g.key === 0)
            .single()
            .toArray();

        const odds = result.where(g => g.key === 1)
            .single()
            .toArray();

        expect(evens).toEqual([2, 4, 6, 8, 10]);
        expect(odds).toEqual([1, 3, 5, 7, 9]);
    });
});

describe("Enumerable.last", () =>
{
    it("should return the last item in the Enumerable", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(4).toEqual(result.last());
    });

    it("should return the last item in the Enumerable after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(3).toEqual(result.last(i => i % 2 !== 0));
    });

    it("should throw an exception if the Enumerable is empty", () =>
    {
        const array = [];
        const result = new ArrayEnumerable(array);

        try
        {
            result.last();
            fail(); //assert.fail(undefined, undefined, "For some reason the Enumerable is not empty");
        }
        catch (ex)
        {
            // do nothing
        }
    });
});

describe("Enumerable.lastOrDefault", () =>
{
    it("should return the last item in the Enumerable", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(4).toEqual(result.lastOrDefault());
    });

    it("should return the last item in the Enumerable after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new ArrayEnumerable(array);

        expect(4).toEqual(result.lastOrDefault(i => i % 2 === 0));
    });

    it("should return null if the Enumerable is empty", () =>
    {
        const array = [];
        const result = new ArrayEnumerable(array);

        expect(result.lastOrDefault()).toEqual(null);
    });
});

describe("Enumerable.max", () =>
{
    it("should return the max of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);

        const result = query.max((i) => i);

        expect(4).toEqual(result);
    });
});

describe("Enumerable.min", () =>
{
    it("should return the min of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);

        const result = query.min((i) => i);

        expect(result).toEqual(1);
    });
});

describe("Enumerable.ofType", () =>
{
    class BaseClass
    {
        public get property() { return "base value"; }
    }

    class DerivedClass extends BaseClass
    {
        public get property() { return "derived value"; }
    }

    class DerivedClass2 extends DerivedClass
    {
        public get property() { return "derived 2 value"; }
    }

    it("should return the items that match the type", () =>
    {
        const array: BaseClass[] = [
            new BaseClass(),
            new DerivedClass(),
            new BaseClass(),
            new DerivedClass2(),
            new DerivedClass()
        ];

        const query = new ArrayEnumerable(array);
        const result = query.ofType(DerivedClass);

        expect(result.count()).toEqual(3);

        expect(result.item(0)?.property).toEqual("derived value");
        expect(result.item(1)?.property).toEqual("derived 2 value");
        expect(result.item(2)?.property).toEqual("derived value");
    });
});

describe("Enumerable.orderBy", () =>
{
    it("should return the items in ascending order", () =>
    {
        const array = [1, 4, 2, 3];
        const query = new ArrayEnumerable(array);
        const expected = [1, 2, 3, 4];

        const result = query.orderBy((i) => i);

        for (let i = 0; i < result.count(); i++)
        {
            expect(expected[i]).toEqual(result.item(i));
        }
    });

    it("should return the items in descending order", () =>
    {
        const array = [1, 4, 2, 3];
        const query = new ArrayEnumerable(array);
        const expected = [4, 3, 2, 1];

        const result = query.orderByDescending((i) => i);

        for (let i = 0; i < result.count(); i++)
        {
            expect(expected[i]).toEqual(result.item(i));
        }
    });
});

describe("Enumerable.skip", () =>
{
    it("should return the items after the skip length (2)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);
        const expected = [3, 4];

        const result = query.skip(2);

        for (let i = 0; i < result.count(); i++)
        {
            expect(result.item(i)).toEqual(expected[i]);
        }
    });

    it("should return the items after the skip length (0)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);
        const expected = [1, 2, 3, 4];

        const result = query.skip(0);

        for (let i = 0; i < result.count(); i++)
        {
            expect(result.item(i)).toEqual(expected[i]);
        }
    });

    it("should return the items after the skip length (4)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);
        const expected = [];

        const result = query.skip(4);

        for (let i = 0; i < result.count(); i++)
        {
            expect(result.item(i)).toEqual(expected[i]);
        }
    });
});

describe("Enumerable.select", () =>
{
    it("should return a map of the set 1", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);
        const expected = [1, 2, 3, 4];

        const result = query.select((i) => i);

        for (let i = 0; i < result.count(); i++)
        {
            expect(result.item(i)).toEqual(expected[i]);
        }
    });

    it("should return a map of the set 2", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);
        const expected = [2, 4, 6, 8];

        const result = query.select((i) => i * 2);

        for (let i = 0; i < result.count(); i++)
        {
            expect(expected[i]).toEqual(result.item(i));
        }
    });
});

describe("Enumerable.selectMany", () =>
{
    it("should return a flat map of the set 1", () =>
    {
        const array = [[1], [2], [3], [4]];
        const query = new ArrayEnumerable(array);
        const expected = [1, 2, 3, 4];

        const result = query.selectMany(i => new ArrayEnumerable(i));

        for (let i = 0; i < result.count(); i++)
        {
            expect(result.item(i)).toEqual(expected[i]);
        }
    });

    it("should return a flat map of the set 1.2", () =>
    {
        const array = [new ArrayEnumerable([1, 2, 3]), new ArrayEnumerable([4, 5])];
        const query = new ArrayEnumerable(array);
        const expected = [1, 2, 3, 4, 5];

        const result = query.selectMany(i => i);

        for (let i = 0; i < result.count(); i++)
        {
            expect(result.item(i)).toEqual(expected[i]);
        }
    });

    it("should return a flat map of the set 2", () =>
    {
        const array = [[1, 2], [2, 3], [3, 4], [4, 5]];
        const query = new ArrayEnumerable(array);
        const expected = [1, 2, 2, 3, 3, 4, 4, 5];

        const result = query.selectMany(i => new ArrayEnumerable(i));

        for (let i = 0; i < result.count(); i++)
        {
            expect(expected[i]).toEqual(result.item(i));
        }
    });

});


describe("Enumerable.sum", () =>
{
    it("should return the sum of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);

        const result = query.sum((i) => i);

        expect(10).toEqual(result);
    });
});

describe("Enumerable.take", () =>
{
    it("should return a subset of items of the specified length (2)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);
        const expected = [1, 2];

        const result = query.take(2);

        for (let i = 0; i < result.count(); i++)
        {
            expect(expected[i]).toEqual(result.item(i));
        }
    });

    it("should return a subset of items of the specified length (0)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);
        const expected = [];

        const result = query.take(0);

        for (let i = 0; i < result.count(); i++)
        {
            expect(expected[i]).toEqual(result.item(i));
        }
    });

    it("should return a subset of items of the specified length (4)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);
        const expected = [1, 2, 3, 4];

        const result = query.take(4);

        for (let i = 0; i < result.count(); i++)
        {
            expect(expected[i]).toEqual(result.item(i));
        }
    });
});

describe("Enumerable.where", () =>
{
    it("should return the items that match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const query = new ArrayEnumerable(array);

        const result = query.where((i) => i % 2 == 0);

        expect(result.count()).toEqual(2);

        expect(result.item(0)).toEqual(2);
        expect(result.item(1)).toEqual(4);
    });
});

describe("Enumerable Big sets", () =>
{
    it("should select all even numbers", (done) =>
    {
        logger.trace(`init: ${new Date().getTime()}`);

        const enumerable = Enumerable.range(1, 1000000);
        logger.trace(`enumerable: ${new Date().getTime()}`);

        const query = enumerable;
        logger.trace(`query: ${new Date().getTime()}`);

        const evenNumbers = query.where(i => i % 2 == 0);
        logger.trace(`evenNumbers: ${new Date().getTime()}`);

        evenNumbers.toArray();
        logger.trace(`result: ${new Date().getTime()}`);

        done();
    });

    it("should select all even numbers (built-in)", (done) =>
    {
        logger.trace(`init: ${new Date().getTime()}`);
        const array = Array.from(Array(1000001).keys());

        array.shift();

        logger.trace(`begin: ${new Date().getTime()}`);
        array.filter(i => i % 2 == 0);
        logger.trace(`end: ${new Date().getTime()}`);

        done();
    });
});

describe("Enumerable.range", () =>
{
    it("should return an enumerable of numbers from 1 to 10 (slow)", () =>
    {
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const actual = Enumerable.range(1, 10);

        for (let i = 0; i < expected.length; i++)
        {
            expect(actual.item(i)).toEqual(expected[i]);
        }
    });

    it("should return an enumerable of numbers from -10 to 10 (slow)", () =>
    {
        const expected = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const actual = Enumerable.range(-10, 21);

        for (let i = 0; i < expected.length; i++)
        {
            expect(actual.item(i)).toEqual(expected[i]);
        }
    });

    it("should return an enumerable of numbers from 1 to 10 (fast)", () =>
    {
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const actual = Enumerable.range(1, 10).toArray();

        for (let i = 0; i < expected.length; i++)
        {
            expect(actual[i]).toEqual(expected[i]);
        }
    });

    it("should return an enumerable of numbers from -10 to 10 (slow)", () =>
    {
        const expected = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const actual = Enumerable.range(-10, 21).toArray();

        for (let i = 0; i < expected.length; i++)
        {
            expect(actual[i]).toEqual(expected[i]);
        }
    });

    it("should throw an exception saying that only integers are supported", (done) =>
    {
        try
        {
            Enumerable.range(1.1, 10);
            fail();
        }
        catch
        {
            done();
        }
    });
});

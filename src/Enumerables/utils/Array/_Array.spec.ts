import all from './all.js';
import any from './any.js';
import average from './average.js';
import contains from './contains.js';
import count from "./count.js";
import distinct from './distinct.js';
import first from './first.js';
import firstOrDefault from './firstOrDefault.js';
import forEach from './forEach.js';
import groupBy from './groupBy.js';
import item from './item.js';
import last from './last.js';
import lastOrDefault from './lastOrDefault.js';
import max from './max.js';
import min from './min.js';
import ofType from './ofType.js';
import select from './select.js';
import single from './single.js';
import singleOrDefault from './singleOrDefault.js';
import sum from './sum.js';
import take from './take.js';
import where from './where.js';



describe("Array", () =>
{
    it("should return a Array with the array items in the same order", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(array.length).toEqual(count(result));

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(array[i]);
        }
    });

    it("should return an Array with the List items in the same order", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(array.length).toEqual(count(result));

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(array[i]);
        }
    });

    it("should be able to be enumerated with for(..of..)", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(array.length).toEqual(count(result));
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
        const source = [];

        expect(count(source)).toEqual(0);
    });
});

describe("Array.all", () =>
{
    it("should return true if all items match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(all(result, (i) => i > 0)).toEqual(true);
    });

    it("should return false if one item doesnt match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(all(result, (i) => i > 1)).toEqual(false);
    });
});

describe("Array.any", () =>
{
    it("should return true if the Array has items", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(any(result)).toEqual(true);
    });

    it("should return false if the Array is empty", () =>
    {
        const array = [];
        const result = array;

        expect(any(result)).toEqual(false);
    });

    it("should return true if any of the items match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(any(result, (i) => i === 2)).toEqual(true);
    });

    it("should return false if none of the items match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(any(result, (i) => i === -1)).toEqual(false);
    });
});

describe("Array.average", () =>
{
    it("should return the average of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = average(query, (i) => i);

        expect(result).toEqual(2.5);
    });
});

describe("Array.count", () =>
{
    it("should return the number of items in the Array", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = count(query);

        expect(result).toEqual(4);
    });
});

describe("Array.distinct", () =>
{
    it("should return only unique items in the collection", () =>
    {
        const array = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4];
        const expected = [1, 2, 3, 4];
        const result = [...distinct(array, (n) => n)];

        expect(result.length).toEqual(expected.length);

        for (let i = 0; i < result.length; i++)
        {
            expect(result[i]).toEqual(expected[i]);
        }
    });
});

describe("Array.first", () =>
{
    it("should return the first item in the Array", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(first(result)).toEqual(1);
    });

    it("should return the first item in the Array after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(first(result, i => i % 2 === 0)).toEqual(2);
    });

    it("should throw an exception if the Array is empty", () =>
    {
        const array = [];
        const result = array;

        try
        {
            first(result);
            fail();
        }
        catch (ex)
        {
            // do nothing
        }
    });
});

describe("Array.firstOrDefault", () =>
{
    it("should return the first item in the Array", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(firstOrDefault(result)).toEqual(1);
    });

    it("should return the first item in the Array after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(firstOrDefault(result, i => i % 2 === 0)).toEqual(2);
    });

    it("should return null if the Array is empty", () =>
    {
        const array = [];
        const result = array;

        expect(firstOrDefault(result)).toEqual(null);
    });
});


// describe("Array.join", () =>
// {
//     it("should return the items joined by the selector", () =>
//     {
//         const outer = [1, 2, 3, 4, 5, 6];
//         const inner = [2, 4, 6, 8];
//         const expected = [2, 4, 6];

//         const qOuter = new ArrayArray(outer);
//         const qInner = new ArrayArray(inner);

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

//         //expect(count(result)).toEqual(expected.length);

//         // result.forEach(i => expect(i.i).toStrictEqual(i.o));
//     });
// });


describe("Array.groupBy", () =>
{
    it("should return the items grouped by whether they are even or odd", () =>
    {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const query = array;

        const result = groupBy(query, i => i % 2);

        expect(2).toEqual(count(result));

        const evens = single(where(result, g => g.key === 0)).items;
        const odds = single(where(result, g => g.key === 1)).items;

        expect(evens).toEqual([2, 4, 6, 8, 10]);
        expect(odds).toEqual([1, 3, 5, 7, 9]);
    });
});

describe("Array.last", () =>
{
    it("should return the last item in the Array", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(last(result)).toEqual(4);
    });

    it("should return the last item in the Array after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(3).toEqual(last(result, i => i % 2 !== 0));
    });

    it("should throw an exception if the Array is empty", () =>
    {
        const array = [];
        const result = array;

        try
        {
            last(result,);
            fail(); //assert.fail(undefined, undefined, "For some reason the Array is not empty");
        }
        catch (ex)
        {
            // do nothing
        }
    });
});

describe("Array.lastOrDefault", () =>
{
    it("should return the last item in the Array", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(4).toEqual(lastOrDefault(result,));
    });

    it("should return the last item in the Array after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(4).toEqual(lastOrDefault(result, i => i % 2 === 0));
    });

    it("should return null if the Array is empty", () =>
    {
        const array = [];
        const result = array;

        expect(lastOrDefault(result,)).toEqual(null);
    });
});

describe("Array.max", () =>
{
    it("should return the max of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = max(query, (i) => i);

        expect(4).toEqual(result);
    });
});

describe("Array.min", () =>
{
    it("should return the min of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = min(query, (i) => i);

        expect(result).toEqual(1);
    });
});

describe("Array.ofType", () =>
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

        const query = array;
        const result = ofType(query, DerivedClass);        

        expect(count(result)).toEqual(3);


        expect(item(result, 0)?.property).toEqual("derived value");
        expect(item(result, 1)?.property).toEqual("derived 2 value");
        expect(item(result, 2)?.property).toEqual("derived value");
    });
});

// describe("Array.orderBy", () =>
// {
//     it("should return the items in ascending order", () =>
//     {
//         const array = [1, 4, 2, 3];
//         const query = array;
//         const expected = [1, 2, 3, 4];

//         const result = orderBy(query, (i) => i);

//         for (let i = 0; i < count(result); i++)
//         {
//             expect(expected[i]).toEqual(item(result, i));
//         }
//     });

//     it("should return the items in descending order", () =>
//     {
//         const array = [1, 4, 2, 3];
//         const query = array;
//         const expected = [4, 3, 2, 1];

//         const result = orderByDescending(query, (i) => i);

//         for (let i = 0; i < count(result); i++)
//         {
//             expect(expected[i]).toEqual(item(result, i));
//         }
//     });
// });

// describe("Array.skip", () =>
// {
//     it("should return the items after the skip length (2)", () =>
//     {
//         const array = [1, 2, 3, 4];
//         const query = array;
//         const expected = [3, 4];

//         const result = skip(query, 2);

//         for (let i = 0; i < count(result); i++)
//         {
//             expect(item(result, i)).toEqual(expected[i]);
//         }
//     });

//     it("should return the items after the skip length (0)", () =>
//     {
//         const array = [1, 2, 3, 4];
//         const query = array;
//         const expected = [1, 2, 3, 4];

//         const result = skip(query, 0);

//         for (let i = 0; i < count(result); i++)
//         {
//             expect(item(result, i)).toEqual(expected[i]);
//         }
//     });

//     it("should return the items after the skip length (4)", () =>
//     {
//         const array = [1, 2, 3, 4];
//         const query = array;
//         const expected = [];

//         const result = skip(query, 4);

//         for (let i = 0; i < count(result); i++)
//         {
//             expect(item(result, i)).toEqual(expected[i]);
//         }
//     });
// });

describe("Array.select", () =>
{
    it("should return a map of the set 1", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;
        const expected = [1, 2, 3, 4];

        const result = select(query, (i) => i);

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(expected[i]);
        }
    });

    it("should return a map of the set 2", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;
        const expected = [2, 4, 6, 8];

        const result = select(query, (i) => i * 2);

        for (let i = 0; i < count(result); i++)
        {
            expect(expected[i]).toEqual(item(result, i));
        }
    });
});

// describe("Array.selectMany", () =>
// {
//     it("should return a flat map of the set 1", () =>
//     {
//         const array = [[1], [2], [3], [4]];
//         const query = array;
//         const expected = [1, 2, 3, 4];

//         const result = selectMany(query, i => new ArrayArray(i));

//         for (let i = 0; i < count(result); i++)
//         {
//             expect(item(result, i)).toEqual(expected[i]);
//         }
//     });

//     it("should return a flat map of the set 1.2", () =>
//     {
//         const array = [new ArrayArray([1, 2, 3]), new ArrayArray([4, 5])];
//         const query = array;
//         const expected = [1, 2, 3, 4, 5];

//         const result = selectMany(query, i => i);

//         for (let i = 0; i < count(result); i++)
//         {
//             expect(item(result, i)).toEqual(expected[i]);
//         }
//     });

//     it("should return a flat map of the set 2", () =>
//     {
//         const array = [[1, 2], [2, 3], [3, 4], [4, 5]];
//         const query = array;
//         const expected = [1, 2, 2, 3, 3, 4, 4, 5];

//         const result = selectMany(query, i => new ArrayArray(i));

//         for (let i = 0; i < count(result); i++)
//         {
//             expect(expected[i]).toEqual(item(result, i));
//         }
//     });

// });


describe("Array.sum", () =>
{
    it("should return the sum of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = sum(query, (i) => i);

        expect(10).toEqual(result);
    });
});

describe("Array.take", () =>
{
    it("should return a subset of items of the specified length (2)", () =>
    {
        const array = [1, 2, 3, 4];
        const expected = [1, 2];

        const result = take(array, 2);

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(expected[i]);
        }
    });

    it("should return a subset of items of the specified length (0)", () =>
    {
        const array = [1, 2, 3, 4];
        const expected = [];

        const result = take(array, 0);

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(expected[i]);
        }
    });

    it("should return a subset of items of the specified length (4)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;
        const expected = [1, 2, 3, 4];

        const result = take(query, 4);

        for (let i = 0; i < count(result); i++)
        {
            expect(expected[i]).toEqual(item(result, i));
        }
    });
});

describe("Array.where", () =>
{
    it("should return the items that match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = where(query, (i) => i % 2 == 0);

        expect(count(result)).toEqual(2);

        expect(item(result, 0)).toEqual(2);
        expect(item(result, 1)).toEqual(4);
    });
});

// describe("Array Big sets", () =>
// {
//     it("should select all even numbers", (done) =>
//     {

//         const enumerable = Array.range(1, 1000000);

//         const query = enumerable;

//         const evenNumbers = where(query,i => i % 2 == 0);

//         evenNumbers.toArray();

//         done();
//     });

//     it("should select all even numbers (built-in)", (done) =>
//     {
//         const array = Array.from(Array(1000001).keys());

//         array.shift();

//         array.filter(i => i % 2 == 0);

//         done();
//     });
// });

// describe("Array.range", () =>
// {
//     it("should return an enumerable of numbers from 1 to 10 (slow)", () =>
//     {
//         const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//         const actual = Array.range(1, 10);

//         for (let i = 0; i < expected.length; i++)
//         {
//             expect(actual.item(i)).toEqual(expected[i]);
//         }
//     });

//     it("should return an enumerable of numbers from -10 to 10 (slow)", () =>
//     {
//         const expected = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//         const actual = Array.range(-10, 21);

//         for (let i = 0; i < expected.length; i++)
//         {
//             expect(actual.item(i)).toEqual(expected[i]);
//         }
//     });

//     it("should return an enumerable of numbers from 1 to 10 (fast)", () =>
//     {
//         const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//         const actual = Array.range(1, 10).toArray();

//         for (let i = 0; i < expected.length; i++)
//         {
//             expect(actual[i]).toEqual(expected[i]);
//         }
//     });

//     it("should return an enumerable of numbers from -10 to 10 (slow)", () =>
//     {
//         const expected = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//         const actual = Array.range(-10, 21).toArray();

//         for (let i = 0; i < expected.length; i++)
//         {
//             expect(actual[i]).toEqual(expected[i]);
//         }
//     });

//     it("should throw an exception saying that only integers are supported", (done) =>
//     {
//         try
//         {
//             Array.range(1.1, 10);
//             fail();
//         }
//         catch
//         {
//             done();
//         }
//     });
// });

﻿import all from './all';
import any from './any';
import average from './average';
import count from "./count";
import distinct from './distinct';
import first from './first';
import firstOrDefault from './firstOrDefault';
import groupBy from './groupBy';
import item from './item';
import join from './join';
import last from './last';
import lastOrDefault from './lastOrDefault';
import max from './max';
import min from './min';
import ofType from './ofType';
import select from './select';
import sequenceEqual from './sequenceEqual';
import sum from './sum';
import take from './take';
import where from './where';



describe("Iterator", () =>
{
    it("should return a Iterator with the array items in the same order", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(array.length).toEqual(count(result));

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(array[i]);
        }
    });

    it("should return an Iterator with the List items in the same order", () =>
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

describe("Iterator.all", () =>
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

describe("Iterator.any", () =>
{
    it("should return true if the Iterator has items", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(any(result)).toEqual(true);
    });

    it("should return false if the Iterator is empty", () =>
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

describe("Iterator.average", () =>
{
    it("should return the average of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = average(query, (i) => i);

        expect(result).toEqual(2.5);
    });
});

describe("Iterator.count", () =>
{
    it("should return the number of items in the Iterator", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = count(query);

        expect(result).toEqual(4);
    });
});

describe("Iterator.distinct", () =>
{
    it("should return only unique items in the collection", () =>
    {
        const array = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4];
        const expected = [1, 2, 3, 4];

        const result = distinct(array, (n) => n);

        expect(count(result)).toEqual(expected.length);

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(expected[i]);
        }
    });
});

describe("Iterator.first", () =>
{
    it("should return the first item in the Iterator", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(first(result)).toEqual(1);
    });

    it("should return the first item in the Iterator after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(first(result, i => i % 2 === 0)).toEqual(2);
    });

    it("should throw an exception if the Iterator is empty", () =>
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

describe("Iterator.firstOrDefault", () =>
{
    it("should return the first item in the Iterator", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(firstOrDefault(result)).toEqual(1);
    });

    it("should return the first item in the Iterator after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(firstOrDefault(result, i => i % 2 === 0)).toEqual(2);
    });

    it("should return null if the Iterator is empty", () =>
    {
        const array = [];
        const result = array;

        expect(firstOrDefault(result)).toEqual(null);
    });
});


// describe("Iterator.join", () =>
// {
//     it("should return the items joined by the selector", () =>
//     {
//         const outer = [1, 2, 3, 4, 5, 6];
//         const inner = [2, 4, 6, 8];
//         const expected = [2, 4, 6];

//         const qOuter = new ArrayIterator(outer);
//         const qInner = new ArrayIterator(inner);

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


describe("Iterator.groupBy", () =>
{
    it("should return the items grouped by whether they are even or odd", () =>
    {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const query = array;

        const result = groupBy(query, i => i % 2);

        expect(result.size).toEqual(2);

        const evens = result.get(0);
        const odds = result.get(1);

        expect(evens).toEqual([2, 4, 6, 8, 10]);
        expect(odds).toEqual([1, 3, 5, 7, 9]);
    });
});

describe("Iterator.join", () =>
{
    interface Person
    {
        name: string;
    }

    interface Pet
    {
        name: string;
        owner: Person;
    }



    it("should return the two sets joined by a common key", () =>
    {
        const magnus: Person = { name: "Hedlund, Magnus" };
        const terry: Person = { name: "Adams, Terry" };
        const charlotte: Person = { name: "Weiss, Charlotte" };

        const barley: Pet = { name: "Barley", owner: terry };
        const boots: Pet = { name: "Boots", owner: terry };
        const whiskers: Pet = { name: "Whiskers", owner: charlotte };
        const daisy: Pet = { name: "Daisy", owner: magnus };

        const people = [magnus, terry, charlotte];
        const pets = [barley, boots, whiskers, daisy];

        const result = Array.from(join(people, pets,
            person => person,
            pet => pet.owner,
            (person, pet) => ({ ownerName: person.name, pet: pet.name })));

        expect(result).toEqual([
            { ownerName: "Hedlund, Magnus", pet: "Daisy" },
            { ownerName: "Adams, Terry", pet: "Barley" },
            { ownerName: "Adams, Terry", pet: "Boots" },
            { ownerName: "Weiss, Charlotte", pet: "Whiskers" },
        ]);
    });
});

describe("Iterator.last", () =>
{
    it("should return the last item in the Iterator", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(4).toEqual(last(result,));
    });

    it("should return the last item in the Iterator after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(3).toEqual(last(result, i => i % 2 !== 0));
    });

    it("should throw an exception if the Iterator is empty", () =>
    {
        const array = [];
        const result = array;

        try
        {
            last(result,);
            fail(); //assert.fail(undefined, undefined, "For some reason the Iterator is not empty");
        }
        catch (ex)
        {
            // do nothing
        }
    });
});

describe("Iterator.lastOrDefault", () =>
{
    it("should return the last item in the Iterator", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(4).toEqual(lastOrDefault(result,));
    });

    it("should return the last item in the Iterator after applying the filter", () =>
    {
        const array = [1, 2, 3, 4];
        const result = array;

        expect(4).toEqual(lastOrDefault(result, i => i % 2 === 0));
    });

    it("should return null if the Iterator is empty", () =>
    {
        const array = [];
        const result = array;

        expect(lastOrDefault(result,)).toEqual(null);
    });
});

describe("Iterator.max", () =>
{
    it("should return the max of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = max(query, (i) => i);

        expect(4).toEqual(result);
    });
});

describe("Iterator.min", () =>
{
    it("should return the min of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = min(query, (i) => i);

        expect(result).toEqual(1);
    });
});

describe("Iterator.ofType", () =>
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
        const result = [...ofType(query, DerivedClass)];

        expect(result.length).toEqual(3);

        expect(result[0].property).toEqual("derived value");
        expect(result[1].property).toEqual("derived 2 value");
        expect(result[2].property).toEqual("derived value");
    });
});

describe("Iterator.sequenceEqual", () =>
{
    it("should fail when one is empty", () =>
    {
        const array = [1, 4, 2, 3];

        expect(sequenceEqual(array, [])).toBe(false);
        expect(sequenceEqual([], array)).toBe(false);
    });

    it("should fail when same length different values", () =>
    {
        const array = [1, 4, 2, 3];
        const array2 = [1, 2, 3, 4];

        expect(sequenceEqual(array, array2)).toBe(false);
    });

    it("should fail when different length", () =>
    {
        const array = [1, 4, 2, 3];
        const array2 = [1, 4, 2];

        expect(sequenceEqual(array, array2)).toBe(false);
    });

    it("should pass when same values", () =>
    {
        const array = [1, 2, 3, 4];
        const array2 = [1, 2, 3, 4];

        expect(sequenceEqual(array, array2)).toBe(true);
    });

});

// describe("Iterator.orderBy", () =>
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

// describe("Iterator.skip", () =>
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

describe("Iterator.select", () =>
{
    it("should return a map of the set 1", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;
        const expected = [1, 2, 3, 4];

        const result = [...select(query, (i) => i)];

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

        const result = [...select(query, (i) => i * 2)];

        for (let i = 0; i < count(result); i++)
        {
            expect(expected[i]).toEqual(item(result, i));
        }
    });
});

// describe("Iterator.selectMany", () =>
// {
//     it("should return a flat map of the set 1", () =>
//     {
//         const array = [[1], [2], [3], [4]];
//         const query = array;
//         const expected = [1, 2, 3, 4];

//         const result = selectMany(query, i => new ArrayIterator(i));

//         for (let i = 0; i < count(result); i++)
//         {
//             expect(item(result, i)).toEqual(expected[i]);
//         }
//     });

//     it("should return a flat map of the set 1.2", () =>
//     {
//         const array = [new ArrayIterator([1, 2, 3]), new ArrayIterator([4, 5])];
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

//         const result = selectMany(query, i => new ArrayIterator(i));

//         for (let i = 0; i < count(result); i++)
//         {
//             expect(expected[i]).toEqual(item(result, i));
//         }
//     });

// });


describe("Iterator.sum", () =>
{
    it("should return the sum of the numbers", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = sum(query, (i) => i);

        expect(10).toEqual(result);
    });
});

describe("Iterator.take", () =>
{
    it("should return a subset of items of the specified length (2)", () =>
    {
        const array = [1, 2, 3, 4];
        const expected = [1, 2];

        const result = [...take(array, 2)];

        expect(result.length).toEqual(2);

        for (let i = 0; i < result.length; i++)
        {
            expect(expected[i]).toEqual(item(result, i));
        }
    });

    it("should return a subset of items of the specified length (0)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = [...take(query, 0)];

        expect(result.length).toEqual(0);
    });

    it("should return a subset of items of the specified length (4)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;
        const expected = [1, 2, 3, 4];

        const result = [...take(query, 4)];

        for (let i = 0; i < count(result); i++)
        {
            expect(expected[i]).toEqual(item(result, i));
        }
    });
});

describe("Iterator.where", () =>
{
    it("should return the items that match the predicate", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;

        const result = [...where(query, (i) => i % 2 == 0)];

        expect(count(result)).toEqual(2);

        expect(item(result, 0)).toEqual(2);
        expect(item(result, 1)).toEqual(4);
    });
});

// describe("Iterator Big sets", () =>
// {
//     it("should select all even numbers", (done) =>
//     {

//         const enumerable = Iterator.range(1, 1000000);

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

// describe("Iterator.range", () =>
// {
//     it("should return an enumerable of numbers from 1 to 10 (slow)", () =>
//     {
//         const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//         const actual = Iterator.range(1, 10);

//         for (let i = 0; i < expected.length; i++)
//         {
//             expect(actual.item(i)).toEqual(expected[i]);
//         }
//     });

//     it("should return an enumerable of numbers from -10 to 10 (slow)", () =>
//     {
//         const expected = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//         const actual = Iterator.range(-10, 21);

//         for (let i = 0; i < expected.length; i++)
//         {
//             expect(actual.item(i)).toEqual(expected[i]);
//         }
//     });

//     it("should return an enumerable of numbers from 1 to 10 (fast)", () =>
//     {
//         const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//         const actual = Iterator.range(1, 10).toArray();

//         for (let i = 0; i < expected.length; i++)
//         {
//             expect(actual[i]).toEqual(expected[i]);
//         }
//     });

//     it("should return an enumerable of numbers from -10 to 10 (slow)", () =>
//     {
//         const expected = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//         const actual = Iterator.range(-10, 21).toArray();

//         for (let i = 0; i < expected.length; i++)
//         {
//             expect(actual[i]).toEqual(expected[i]);
//         }
//     });

//     it("should throw an exception saying that only integers are supported", (done) =>
//     {
//         try
//         {
//             Iterator.range(1.1, 10);
//             fail();
//         }
//         catch
//         {
//             done();
//         }
//     });
// });

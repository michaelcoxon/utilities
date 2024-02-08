import all from './all';
import any from './any';
import average from './average';
import count from "./count";
import distinct from './distinct';
import first from './first';
import firstOrDefault from './firstOrDefault';
import groupBy from './groupBy';
import item from './item';
import last from './last';
import lastOrDefault from './lastOrDefault';
import max from './max';
import min from './min';
import ofType from './ofType';
import select from './select';
import selectMany from './selectMany';
import take from './take';
import where from './where';
import orderBy from './orderBy';
import orderByDescending from './orderByDescending';
import skip from './skip';



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

describe("Array.groupBy", () =>
{
    it("should return the items grouped by whether they are even or odd", () =>
    {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const query = array;

        const result = groupBy(query, i => i % 2);

        expect(result.size).toEqual(2);

        const evens = result.get(0);
        const odds =result.get(1);

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

describe("Array.orderBy", () =>
{
    it("should return the items in ascending order", () =>
    {
        const array = [1, 4, 2, 3];
        const query = array;
        const expected = [1, 2, 3, 4];

        const result = orderBy(query, (i) => i);

        for (let i = 0; i < count(result); i++)
        {
            expect(expected[i]).toEqual(item(result, i));
        }
    });

    it("should return the items in descending order", () =>
    {
        const array = [1, 4, 2, 3];
        const query = array;
        const expected = [4, 3, 2, 1];

        const result = orderByDescending(query, (i) => i);

        for (let i = 0; i < count(result); i++)
        {
            expect(expected[i]).toEqual(item(result, i));
        }
    });
});

describe("Array.skip", () =>
{
    it("should return the items after the skip length (2)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;
        const expected = [3, 4];

        const result = skip(query, 2);

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(expected[i]);
        }
    });

    it("should return the items after the skip length (0)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;
        const expected = [1, 2, 3, 4];

        const result = skip(query, 0);

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(expected[i]);
        }
    });

    it("should return the items after the skip length (4)", () =>
    {
        const array = [1, 2, 3, 4];
        const query = array;
        const expected = [];

        const result = skip(query, 4);

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(expected[i]);
        }
    });
});

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

describe("Array.selectMany", () =>
{
    it("should return a flat map of the set 1", () =>
    {
        const array = [[1], [2], [3], [4]];
        const query = array;
        const expected = [1, 2, 3, 4];

        const result = selectMany(query, i => i);

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(expected[i]);
        }
    });

    it("should return a flat map of the set 1.2", () =>
    {
        const array = [new Array([1, 2, 3]), new Array([4, 5])];
        const query = array;
        const expected = [1, 2, 3, 4, 5];

        const result = selectMany(query, i => selectMany(i, i1=>i1));

        for (let i = 0; i < count(result); i++)
        {
            expect(item(result, i)).toEqual(expected[i]);
        }
    });

    it("should return a flat map of the set 2", () =>
    {
        const array = [[1, 2], [2, 3], [3, 4], [4, 5]];
        const query = array;
        const expected = [1, 2, 2, 3, 3, 4, 4, 5];

        const result = selectMany(query, i => i);

        for (let i = 0; i < count(result); i++)
        {
            expect(expected[i]).toEqual(item(result, i));
        }
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

describe("Array Big sets", () =>
{
    it("should select all even numbers (built-in)", (done) =>
    {
        const array = Array.from(Array(1000001).keys());

        array.shift();

        array.filter(i => i % 2 == 0);

        done();
    });
});



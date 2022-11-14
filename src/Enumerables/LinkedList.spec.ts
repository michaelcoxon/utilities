import { LinkedList } from './index.js';

describe("LinkedList.constructor", () =>
{
    it("should return a LinkedList with the array items in the same order", () =>
    {
        const array = [1, 2, 3, 4];
        const result = new LinkedList(array);

        expect(array.length).toEqual(result.length);

        for (let i = 0; i < result.length; i++)
        {
            expect(array[i]).toEqual(result.item(i));
        }
    });

    it("should return a LinkedList with the LinkedList items in the same order", () =>
    {
        const collection = new LinkedList([1, 2, 3, 4]);
        const result = new LinkedList(collection);

        expect(collection.length).toEqual(result.length);

        for (let i = 0; i < result.length; i++)
        {
            expect(collection.item(i)).toEqual(result.item(i));
        }
    });
});

describe("LinkedList.add", () =>
{
    it("should return a LinkedList with the new item at the end", () =>
    {
        const array = [1, 2, 3, 4];
        const list = new LinkedList(array);
        const new_item = 5;

        list.add(new_item);

        expect(array.length + 1).toEqual(list.length);

        for (let i = 0; i < list.length; i++)
        {
            if (i < 4)
            {
                expect(array[i]).toEqual(list.item(i));
            }
            else
            {
                expect(new_item).toEqual(list.item(i));
            }
        }
    });
});

describe("LinkedList.clear", () =>
{
    it("should return a LinkedList with the items cleared", () =>
    {
        const array = [1, 2, 3, 4];
        const list = new LinkedList(array);

        expect(array.length).toEqual(list.length);

        list.clear();

        expect(0).toEqual(list.length);
    });
});

describe("LinkedList.contains", () =>
{
    it("should return true if the LinkedList contains 4", () =>
    {
        const array = [1, 2, 3, 4];
        const list = new LinkedList(array);

        expect(true).toEqual(list.contains(4));
    });

    it("should return false if the LinkedList does not contain 5", () =>
    {
        const array = [1, 2, 3, 4];
        const list = new LinkedList(array);

        expect(false).toEqual(list.contains(5));
    });
});

// describe("LinkedList.remove", () =>
// {
//     it("should remove the item from the LinkedList", () =>
//     {
//         const array = [1, 2, 3, 4];
//         const list = new LinkedList(array);
//         const expected = [1, 3, 4];
//         const item = 2;

//         list.remove(item);

//         expect(array.length - 1).toEqual(list.length);

//         for (let i = 0; i < list.length; i++)
//         {
//             expect(expected[i]).toEqual(list.item(i));
//         }
//     });

//     it("should throw an exception when we try to remove an item from the LinkedList that is not in the list", () =>
//     {
//         const array = [1, 2, 3, 4];
//         const list = new LinkedList(array);
//         const item = 7;

//         try
//         {
//             list.remove(item);
//             assert.fail(undefined, undefined, "No exception was thrown");
//         }
//         catch (ex)
//         {
//         }
//     });
// });
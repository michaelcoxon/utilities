import Mutex, { lockAsync } from '../src/Mutex';
describe("Mutex.acquire", () =>
{
    it("should populate list with [1,3,2,4,5]", async () =>
    {
        const list: number[] = [];
        const mutex = new Mutex();

        async function a()
        {
            const lock = await mutex.acquireAsync();

            list.push(1);
            list.push(3);

            await lock.releaseAsync();

            list.push(4);
            list.push(5);
        }

        async function b()
        {
            await mutex.waitAsync();
            list.push(2);
        }

        const await_this_after_b = a();
        await b();
        await await_this_after_b;

        expect(list[0]).toEqual(1);
        expect(list[1]).toEqual(3);
        expect(list[2]).toEqual(2);
        expect(list[3]).toEqual(4);
        expect(list[4]).toEqual(5);
    });

    it("should populate list with [1,2] (2)", async () =>
    {
        const list: number[] = [];
        const mutex = new Mutex();

        const lock = await mutex.acquireAsync();

        async function insertTwo()
        {
            await mutex.waitAsync();
            list.push(2);
        }

        insertTwo();
        list.push(1);

        await lock.releaseAsync();

        expect(list[0]).toEqual(1);
        expect(list[1]).toEqual(2);
    });

    it("should populate list with [1,2] (3)", async () =>
    {
        const list: number[] = [];
        const mutex = new Mutex();
        const lock = await mutex.acquireAsync();

        await Promise.all([
            lockAsync(mutex, () =>
            {
                list.push(2);
            }),
            mutex.waitAsync().then(() => list.push(1)),
            lock.releaseAsync()
        ]);

        expect(list[0]).toEqual(1);
        expect(list[1]).toEqual(2);
    });
});
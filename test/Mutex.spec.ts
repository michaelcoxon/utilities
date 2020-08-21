import { expect, assert } from 'chai';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import 'mocha';

import { Mutex, lock } from '../src/Mutex';

describe("Mutex.acquire", () =>
{
    it("should populate list with [1,3,2,4,5]", async () =>
    {
        const list: number[] = [];
        const mutex = new Mutex();

        const lock = mutex.acquire();

        const next = mutex.wait().then(() => list.push(2));

        list.push(1);
        list.push(3);

        lock.release();
        await next;

        list.push(4);
        list.push(5);



        assert.equal(list[0], 1);
        assert.equal(list[1], 3);
        assert.equal(list[2], 2);
        assert.equal(list[3], 4);
        assert.equal(list[4], 5);
    });

    it("should populate list with [1,2] (2)", async () =>
    {
        const list: number[] = [];
        const mutex = new Mutex();

        const lock = mutex.acquire();

        async function insertTwo()
        {
            await mutex.wait()
            list.push(2);
        }

        insertTwo();
        list.push(1);

        lock.release();

        assert.equal(list[0], 1);
        assert.equal(list[1], 2);
    });

    it("should populate list with [1,2] (3)", async () =>
    {
        const list: number[] = [];
        const mutex = new Mutex();

        const next = mutex.wait().then(()=>list.push(2));

        lock(mutex, () =>
        {
            list.push(1);
        });

        await next;

        assert.equal(list[0], 1);
        assert.equal(list[1], 2);
    });
});

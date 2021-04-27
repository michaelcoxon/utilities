import { expect, assert } from 'chai';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import 'mocha';

import Mutex, { lockAsync } from '../src/Mutex';

describe("Mutex.acquire", () =>
{
    it("should populate list with [1,3,2,4,5]", async () =>
    {
        const list: number[] = [];
        const mutex = new Mutex();

        async function a()
        {
            const lock = mutex.acquire();

            // we need this to let the program catch up
            // i think it is a base issue with generators
            // not promises            
            await Promise.resolve();


            list.push(1);
            list.push(3);

            await lock.releaseAsync();

            list.push(4);
            list.push(5);
        }

        async function b()
        {
            await mutex.waitAsync()
            list.push(2);
        }

        const await_this_after_b = a();
        await b();
        await a();

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
            await mutex.waitAsync()
            list.push(2);
        }

        insertTwo();
        list.push(1);

        await lock.releaseAsync();

        assert.equal(list[0], 1);
        assert.equal(list[1], 2);
    });

    it("should populate list with [1,2] (3)", async () =>
    {
        const list: number[] = [];
        const mutex = new Mutex();

        const next = mutex.waitAsync().then(() => list.push(2));

        lockAsync(mutex, () =>
        {
            list.push(1);
        });

        await next;

        assert.equal(list[0], 1);
        assert.equal(list[1], 2);
    });
});

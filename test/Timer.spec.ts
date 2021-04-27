import Timer from '../src/Timer';

import { expect, assert } from 'chai';
import 'mocha';
import { slowtest } from './_env';

describe("Timer.constructor", () =>
{
    it("should return a new Timer", () =>
    {
        const timer = new Timer();
        assert.equal(timer.interval, 100);
        assert.equal(timer.autoReset, true);
        assert.equal(timer.enabled, false);
    });

    it("should return a new Timer of a specific interval", () =>
    {
        const timer = new Timer(500);
        assert.equal(timer.interval, 500);
        assert.equal(timer.autoReset, true);
        assert.equal(timer.enabled, false);
    });
});


describe("Timer.enabled", () =>
{
    !slowtest && it("should tick every 500ms", (done) =>
    {
        const timer = new Timer(500);
        let lastEventTime: number | undefined = undefined;
        let ticks = 0;

        timer.onElapsed.addHandler((s, e) =>
        {
            if (ticks == 10)
            {
                timer.stop();
                done();
            }
            if (lastEventTime !== undefined)
            {
                assert.approximately(e.signalTime.getTime(), lastEventTime + 500, 20);
            }

            lastEventTime = e.signalTime.getTime();
            ticks++;
        });

        timer.start();
    })
        .timeout(0);
});

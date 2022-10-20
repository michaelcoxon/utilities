import Timer from './Timer';

describe("Timer.constructor", () =>
{
    it("should return a new Timer", () =>
    {
        const timer = new Timer();
        expect(timer.interval).toEqual(100);
        expect(timer.autoReset).toEqual(true);
        expect(timer.enabled).toEqual(false);
    });

    it("should return a new Timer of a specific interval", () =>
    {
        const timer = new Timer(500);
        expect(timer.interval).toEqual(500);
        expect(timer.autoReset).toEqual(true);
        expect(timer.enabled).toEqual(false);
    });
});


describe("Timer.enabled", () =>
{
    it("should tick every 500ms", (done) =>
    {
        const timer = new Timer(500);
        let lastEventTime: number | undefined = undefined;
        let ticks = 0;

        timer.onElapsed.addHandler((_,e) =>
        {
            if (ticks == 10)
            {
                timer.stop();
                done();
                return;
            }
            
            if (lastEventTime !== undefined)
            {
                const letim = lastEventTime + 500;

                expect(e.signalTime).toBeGreaterThanOrEqual(letim - 20);
                expect(e.signalTime).toBeLessThanOrEqual(letim + 20);
            }

            lastEventTime = e.signalTime;
            
            ticks++;
        });

        timer.start();

        

    }, 15200);
});

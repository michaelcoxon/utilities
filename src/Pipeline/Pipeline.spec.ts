import { ConsoleLogger } from '../Logging';
import Pipeline from './Pipeline';
import { IContext } from './_types';


export { };

describe("Pipeline", () =>
{
    it("should construct", () =>
    {
        new Pipeline(new ConsoleLogger(console));
    });

    it("should queue but not run", async () =>
    {
        const subject = new Pipeline(new ConsoleLogger(console));

        subject.start({
            name: "Task 1",
            executeAsync: async (ctx) =>
            {
                fail();
            }
        });


    });

    it("should queue and run", async () =>
    {
        const subject = new Pipeline(new ConsoleLogger(console));
        let outsideValue = "not changed";
        subject.start(async (ctx) =>
        {
            outsideValue = "changed";
        });

        await subject.executeAsync({
            data: {},
        });

        expect(outsideValue).toEqual("changed");
    });

    it("should queue and run with context", async () =>
    {
        const context: IContext<{ value: string; }> = {
            data: {
                value: " not changed"
            },
        };

        const subject = new Pipeline(new ConsoleLogger(console));

        subject.start(async (ctx: typeof context) =>
        {
            expect(ctx).toBe(context);
            ctx.data.value = "changed";
        });

        await subject.executeAsync(context);

        expect(context.data.value).toEqual("changed");
    });

    it("should queue and run multiple tasks with context", async () =>
    {
        const context: IContext<{ value: string; }> = {
            data: {
                value: "1"
            },
        };

        const subject = new Pipeline(new ConsoleLogger(console));

        subject
            .start(async (ctx: typeof context) =>
            {
                expect(ctx).toBe(context);
                ctx.data.value = "2";
            })
            .then(async (ctx: typeof context) =>
            {
                expect(ctx).toBe(context);
                expect(context.data.value).toEqual("2");
                expect(ctx.data.value).toEqual("2");
                ctx.data.value = "3";
            })
            ;

        await subject.executeAsync(context);

        expect(context.data.value).toEqual("3");
    });
});
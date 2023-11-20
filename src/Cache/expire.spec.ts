import expire from './expire';
import delay from '../Promises/delay';

describe("expire.when", () =>
{
    it("should expire when value is equal to 2", () =>
    {
        const isExpired = expire.when<number>((v) => v == 2);
        expect(isExpired(1)).toBe(false);
        expect(isExpired(2)).toBe(true);
        expect(isExpired(3)).toBe(true);
    });

    it("should expire when value is equal to 2 or 4", () =>
    {
        const createExpiry = () => expire.when<number>(
            expire.when<number>((v) => v == 2),
            expire.when<number>((v) => v == 4)
        );
        {
            const isExpired = createExpiry();
            expect(isExpired(1)).toBe(false);
            expect(isExpired(4)).toBe(true);
            expect(isExpired(3)).toBe(true);
        }
        {
            const isExpired = createExpiry();
            expect(isExpired(1)).toBe(false);
            expect(isExpired(2)).toBe(true);
            expect(isExpired(3)).toBe(true);
        }
    });
});

describe("expire.at", () =>
{
    it("should expire in 5 seconds", async () =>
    {
        const subject = new Date();
        subject.setTime(subject.getTime() + 5000);
        const isExpired = expire.at(subject);

        expect(isExpired()).toBe(false);
        await delay(5000);
        expect(isExpired()).toBe(true);
    }, 6000);
});

describe("expire.in", () =>
{
    it("should expire in 5 seconds", async () =>
    {
        const isExpired = expire.in(5000);

        expect(isExpired()).toBe(false);
        await delay(5000);
        expect(isExpired()).toBe(true);
    }, 6000);
});

describe("expire.now", () =>
{
    it("should expire now", () =>
    {
        const isExpired = expire.now;
        expect(isExpired()).toBe(true);
    });
});
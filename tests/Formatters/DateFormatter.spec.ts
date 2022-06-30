import { DateFormatter } from '../../src/Formatters';




describe("DateFormatter.constructor", () =>
{
    it("it constructs with empty constructor", () =>
    {
        const subject = new DateFormatter();
        expect(subject).not.toBeNull();
    });

    it("it constructs with empty config", () =>
    {
        const subject = new DateFormatter({});
        expect(subject).not.toBeNull();
    });

    it("it constructs with overridden config", () =>
    {
        const subject = new DateFormatter({ am: "after midnight", pm: "post midday" });
        expect(subject).not.toBeNull();
    });
});

describe("DateFormatter.format fixed", () =>
{
    it("it formats with empty constructor", () =>
    {
        const subject = new DateFormatter();

        const expected = "11:59:00 PM 13/12/2022";
        const actual = subject.format(new Date("2022-12-13 23:59:00"), "h:mm:ss tt dd/MM/yyyy");

        expect(actual).toEqual(expected);
    });

    it("it formats with empty config", () =>
    {
        const subject = new DateFormatter({});

        const expected = "11:59:00 PM 13/12/2022";
        const actual = subject.format(new Date("2022-12-13 23:59:00"), "h:mm:ss tt dd/MM/yyyy");

        expect(actual).toEqual(expected);
    });

    it("it formats with overridden config", () =>
    {
        const subject = new DateFormatter({ am: "after midnight", pm: "post midday" });

        const expected = "11:59:00 post midday 13/12/2022";
        const actual = subject.format(new Date("2022-12-13 23:59:00"), "h:mm:ss tt dd/MM/yyyy");

        expect(actual).toEqual(expected);
    });

    it("it formats leaving unmatched as the same", () =>
    {
        const subject = new DateFormatter();

        const expected = "11:59:00 PM 13/12/2022 turtle";
        const actual = subject.format(new Date("2022-12-13 23:59:00"), "h:mm:ss tt dd/MM/yyyy turtle");

        expect(actual).toEqual(expected);
    });
});
import Type from '../../src/Type/Type';

describe("Type.getType", () =>
{
    it("should return Number (instance)", () =>
    {
        const expectName = "Number";
        const actual = Type.getType(3);

        expect(actual.name).toEqual(expectName);
    });

    it("should return String (instance)", () =>
    {
        const expectName = "String";
        const actual = Type.getType("");

        expect(actual.name).toEqual(expectName);
    });

    it("should return Boolean (instance)", () =>
    {
        const expectName = "Boolean";
        const actual = Type.getType(true);

        expect(actual.name).toEqual(expectName);
    });

    it("should return Date (instance)", () =>
    {
        const expectName = "Date";
        const actual = Type.getType(new Date());

        expect(actual.name).toEqual(expectName);
    });
    /*
        it("should return number (type)", () =>
        {
            const expectName = "Number"; 
            const actual = Type.getType(Number);
    
            expect(actual.name).toEqual(expectName);
        });
        */
});
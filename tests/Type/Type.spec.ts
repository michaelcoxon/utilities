import { Type } from '../../src';

describe("Type.getType", () =>
{
    it("should return number (instance)", () =>
    {
        const expectName = "Number";
        const actual = Type.getType(3);

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
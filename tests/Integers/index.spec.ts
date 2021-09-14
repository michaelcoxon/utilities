import { Int32 } from '../../src';

interface IComplexObject
{
    id: Int32;
    name: string;
}

describe("ComplexObject", () =>
{
    it("should return IComplexObject of the JSON.stringify", () =>
    {
        const subject: IComplexObject = {
            id: new Int32(65),
            name: "hello"
        };

        const expectedObject = { id: 65, name: "hello" };
        const expected = JSON.stringify(expectedObject);
        const actual = JSON.stringify(subject);

        expect(actual).toEqual(expected);
    });

    /*
    it("should return the JSON.stringify of the IComplexObject", () =>
    {
        const subject = { id: 65, name: "hello" };
        const expected: IComplexObject = {
            id: new Int32(65),
            name: "hello"
        };

        function replacer(key: string, value: unknown)
        {
            if (value instanceof Int32)
            {
                return value.valueOf();
            }
            return value;
        }

        const actualJson = JSON.stringify(subject, replacer);
        const actual = JSON.parse(actualJson);

        expect(actual).toEqual(expected);
    });
    */
});
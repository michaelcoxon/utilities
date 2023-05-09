import toCharArray from './toCharArray';

describe("toCharArray", () =>
{
    it("should return an array with all characters", () =>
    {
        expect(toCharArray('1234')).toEqual(['1', '2', '3', '4']);
        //assert.sameOrderedMembers(toCharArray('1234'), ['1', '2', '3', '4']);
    });

    it("should return an empty array if the string is empty", () =>
    {
        expect(toCharArray('')).toEqual([]);
        //assert.sameOrderedMembers(toCharArray(''), []);
    });
});

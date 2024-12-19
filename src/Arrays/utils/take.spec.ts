
import take from './take';

describe("take", () =>
    {
        it("should return a subset of items of the specified length (2)", () =>
        {
            const array = [1, 2, 3, 4];
            const expected = [1, 2];
    
            const result = take(array, 2);
    
            for (let i = 0; i < result.length; i++)
            {
                expect(result[i]).toEqual(expected[i]);
            }
        });
    
        it("should return a subset of items of the specified length (0)", () =>
        {
            const array = [1, 2, 3, 4];
            const expected = [];
    
            const result = take(array, 0);
    
            for (let i = 0; i < result.length; i++)
            {
                expect(result[i]).toEqual(expected[i]);
            }
        });
    
        it("should return a subset of items of the specified length (4)", () =>
        {
            const array = [1, 2, 3, 4];
            const query = array;
            const expected = [1, 2, 3, 4];
    
            const result = take(query, 4);
    
            for (let i = 0; i < result.length; i++)
            {
                expect(expected[i]).toEqual(result[i]);
            }
        });
    });
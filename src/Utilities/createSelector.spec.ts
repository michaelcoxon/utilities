import createSelector from './createSelector';

describe("createSelector.string", () =>
{
    it("should create a selector using the key of the object as a string", () =>
    {
        const a = { a: 1 };
        const actual = createSelector<typeof a>('a');
        expect(actual(a)).toEqual(1);
    });

    it("should create a selector using the key of the object as a string (1)", () =>
    {
        const a = { a: 1, b: 2 };
        {
            const actual = createSelector<typeof a>('a');
            expect(actual(a)).toEqual(1);
        }
        {
            const actual = createSelector<typeof a>('b');
            expect(actual(a)).toEqual(2);
        }

    });
});
describe("createSelector.Selector", () =>
{
    it("should create a selector using the key of the object as a string", () =>
    {
        const a = { a: 1 };
        const actual = createSelector<typeof a, number>(item => item.a);
        expect(actual(a)).toEqual(1);
    });

    it("should create a selector using the key of the object as a string (1)", () =>
    {
        const a = { a: 1, b: 2 };
        {
            const actual = createSelector<typeof a, number>(item => item.a);
            expect(actual(a)).toEqual(1);
        }
        {
            const actual = createSelector<typeof a, number>(item => item.b);
            expect(actual(a)).toEqual(2);
        }
    });
});

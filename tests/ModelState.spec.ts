import ModelState from '../src/ModelState/ModelState';
import FactoryModelState from "../src/ModelState/FactoryModelState";
import { isUndefinedOrNull } from '../src/TypeHelpers';


describe("FactoryModelState.construct", () =>
{
    it("should return a new FactoryModelState(valueFactory)", (done) =>
    {
        const myString = "myString";
        const actual = new FactoryModelState<string>(() => myString);

        let firstTime = true;

        actual.subscribe((value) =>
        {
            if (!firstTime && !isUndefinedOrNull(value))
            {
                expect(value).toEqual(myString);
                done();
            }
            firstTime = false;
        });
    }, 6000);

    it("should return a new FactoryModelState(promiseFactory)", (done) =>
    {
        const myString = "myString";
        const actual = new FactoryModelState<string>(() => new Promise<string>(resolve => resolve(myString)));

        let firstTime = true;

        actual.subscribe((value) =>
        {
            if (!firstTime && !isUndefinedOrNull(value))
            {
                expect(value).toEqual(myString);
                done();
            }
            firstTime = false;
        });
    }, 6000);
});

describe("ModelState.construct", () =>
{
    it("should return a new ModelState()", (done) =>
    {
        const myString = "myString";
        const actual = new ModelState<string>();

        actual.subscribe((value) =>
        {
            if (!isUndefinedOrNull(value))
            {
                expect(value).toEqual(myString);
                done();
            }
        });

        actual.value = myString;
    }, 6000);

    it("should return a new ModelState(initialValue)", (done) =>
    {
        const myString = "myString";
        const actual = new ModelState<string>(myString);

        actual.subscribe((value) =>
        {
            if (!isUndefinedOrNull(value))
            {
                expect(value).toEqual(myString);
                done();
            }
        });
    }, 6000);
});
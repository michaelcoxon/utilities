import ModelState from '../src/ModelState/ModelState';
import FactoryModelState from "../src/ModelState/FactoryModelState";
import PollingModelState from "../src/ModelState/PollingModelState";
import { expect, assert } from 'chai';
import 'mocha';
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
                assert.equal(value, myString);
                done();
            }
            firstTime = false;
        });
    })
        .timeout(6000);

    it("should return a new FactoryModelState(promiseFactory)", (done) =>
    {
        const myString = "myString";
        const actual = new FactoryModelState<string>(() => new Promise<string>(resolve => resolve(myString)));

        let firstTime = true;

        actual.subscribe((value) =>
        {
            if (!firstTime && !isUndefinedOrNull(value))
            {
                assert.equal(value, myString);
                done();
            }
            firstTime = false;
        });
    })
        .timeout(6000);
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
                assert.equal(value, myString);
                done();
            }
        });

        actual.value = myString;
    })
        .timeout(6000);

    it("should return a new ModelState(initialValue)", (done) =>
    {
        const myString = "myString";
        const actual = new ModelState<string>(myString);

        actual.subscribe((value) =>
        {
            if (!isUndefinedOrNull(value))
            {
                assert.equal(value, myString);
                done();
            }
        });
    })
        .timeout(6000);
});
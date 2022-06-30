import { throws } from 'assert';
import ArgumentAssertionBuilder from '../src/Assertions/ArgumentAssertionBuilder';

describe("ArgumentAssertionBuilder.isNotNullOrUndefined", () =>
{
    it("should run", () =>
    {
        const arg = "asdf";
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        subject.isNotNullOrUndefined();
    });

    it("should throw", () =>
    {
        const arg = null;
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        throws(() => subject.isNotNullOrUndefined());
    });

    it("should throw", () =>
    {
        const arg = undefined;
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        throws(() => subject.isNotNullOrUndefined());
    });
});

describe("ArgumentAssertionBuilder.isNotNull", () =>
{
    it("should run", () =>
    {
        const arg = "asdf";
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        subject.isNotNull();
    });

    it("should throw", () =>
    {
        const arg = null;
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        throws(() => subject.isNotNull());
    });

    it("should run", () =>
    {
        const arg = undefined;
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        subject.isNotNull();
    });
});

describe("ArgumentAssertionBuilder.isNotUndefined", () =>
{
    it("should run", () =>
    {
        const arg = "asdf";
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        subject.isNotUndefined();
    });

    it("should throw", () =>
    {
        const arg = undefined;
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        throws(() => subject.isNotUndefined());
    });

    it("should run", () =>
    {
        const arg = null;
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        subject.isNotUndefined();
    });
});

describe("ArgumentAssertionBuilder.isTypeOf.string", () =>
{
    it("should run", () =>
    {
        const arg = "asdf";
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        subject.isTypeOf(String);
    });

    it("should throw", () =>
    {
        const arg = undefined;
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        throws(() => subject.isTypeOf(String));
    });

    it("should run", () =>
    {
        const arg = 2;
        const subject = new ArgumentAssertionBuilder(arg, "arg");
        subject.isTypeOf(Number);
    });
    
});
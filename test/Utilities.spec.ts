import { expect, assert } from 'chai';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import 'mocha';

import { Utilities } from '../src/Utilities';

describe("Utilities.equals", () =>
{
    it("should equal the same value object", () =>
    {
        const a = { a: 1 };
        const b = { a: 1 };

        assert.isTrue(Utilities.equals(a, b));
    });

    it("should equal the same value object with json", () =>
    {
        const a = {};
        const b = {};

        assert.isTrue(Utilities.equals(a, b, true));
    });

    it("should equal the same value object with json & deep", () =>
    {
        const a = { a: {} };
        const b = { a: {} };

        assert.isTrue(Utilities.equals(a, b, true, true));
    });

    it("should equal the same value object without json & with deep", () =>
    {
        const a = { a: 1 };
        const b = { a: 1 };

        assert.isTrue(Utilities.equals(a, b, false, true));
    });
});

describe("Utilities.getHash", () =>
{
    it("should get the hash of the object", () =>
    {
        const a = { a: 1 };
        const actual = Utilities.getHash(a);
        assert.isNotNull(actual);
        assert.notEqual(actual.length, 0);
    });

    it("should have the same hash", () =>
    {
        const a = { a: 1 };
        const b = { a: 1 };

        assert.equal(Utilities.getHash(a), Utilities.getHash(b));
    });
});
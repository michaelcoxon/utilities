import{Type} from '../src/Type/Type';

import { expect, assert } from 'chai';
import 'mocha';
import { slowtest } from './_env';

describe("Type.getType", () =>
{
    it("should return number (instance)", () =>
    {
        const expectName = "Number"; 
        const actual = Type.getType(3);

        expect(expectName).eq(actual.name);
    });

    it("should return number (type)", () =>
    {
        const expectName = "Number"; 
        const actual = Type.getType(Number);

        expect(expectName).eq(actual.name);
    });
});
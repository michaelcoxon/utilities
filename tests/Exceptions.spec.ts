import * as Exceptions from '../lib/Exceptions';
import { Utilities } from "../lib/Utilities";
import { expect, assert } from 'chai';
import 'mocha';


function test<T>(exceptionType: Utilities.ConstructorFor<T>, exception: () => T): void
{
    describe(`Exceptions.${exceptionType.name}`, () =>
    {
        it(`should return an ${exceptionType.name}`, () =>
        {
            try
            {
                throw exception();
            }
            catch (e)
            {
                if (!(e instanceof exceptionType))
                {
                    assert.fail();
                }
            }
        });
    });
}

test(Exceptions.ArgumentException, () => new Exceptions.ArgumentException('asdf'));
test(Exceptions.ArgumentUndefinedException, () => new Exceptions.ArgumentUndefinedException('asdf'));
test(Exceptions.ArgumentNullException, () => new Exceptions.ArgumentNullException('asdf'));
test(Exceptions.InvalidTypeException, () => new Exceptions.InvalidTypeException('asdf', 'asdf'));
test(Exceptions.NotImplementedException, () => new Exceptions.NotImplementedException());
test(Exceptions.NotSupportedException, () => new Exceptions.NotSupportedException());
test(Exceptions.OutOfBoundsException, () => new Exceptions.OutOfBoundsException('asdf', 0, 1));
test(Exceptions.IndexOutOfRangeException, () => new Exceptions.IndexOutOfRangeException('asdf', -1, 0, 1));
test(Exceptions.FileNotFoundException, () => new Exceptions.FileNotFoundException('asdf'));
test(Exceptions.KeyNotFoundException, () => new Exceptions.KeyNotFoundException('asdf'));
test(Exceptions.KeyAlreadyDefinedException, () => new Exceptions.KeyAlreadyDefinedException('asdf'));

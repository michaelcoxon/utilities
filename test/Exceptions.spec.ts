
import * as Types from "../src/Types";
import { expect, assert } from 'chai';
import 'mocha';
import ArgumentException from '../src/Exceptions/ArgumentException';
import ArgumentNullException from '../src/Exceptions/ArgumentNullException';
import ArgumentUndefinedException from '../src/Exceptions/ArgumentUndefinedException';
import NotImplementedException from '../src/Exceptions/NotImplementedException';
import NotSupportedException from '../src/Exceptions/NotSupportedException';
import OutOfBoundsException from '../src/Exceptions/OutOfBoundsException';
import InvalidTypeException from '../src/Exceptions/InvalidTypeException';
import IndexOutOfRangeException from '../src/Exceptions/IndexOutOfRangeException';
import FileNotFoundException from '../src/Exceptions/FileNotFoundException';
import KeyNotFoundException from '../src/Exceptions/KeyNotFoundException';
import KeyAlreadyDefinedException from '../src/Exceptions/KeyAlreadyDefinedException';


function test<T>(exceptionType: Types.ConstructorFor<T>, exception: () => T): void
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

test(ArgumentException, () => new ArgumentException('asdf'));
test(ArgumentUndefinedException, () => new ArgumentUndefinedException('asdf'));
test(ArgumentNullException, () => new ArgumentNullException('asdf'));
test(InvalidTypeException, () => new InvalidTypeException('asdf', 'asdf'));
test(NotImplementedException, () => new NotImplementedException());
test(NotSupportedException, () => new NotSupportedException());
test(OutOfBoundsException, () => new OutOfBoundsException('asdf', 0, 1));
test(IndexOutOfRangeException, () => new IndexOutOfRangeException('asdf', -1, 0, 1));
test(FileNotFoundException, () => new FileNotFoundException('asdf'));
test(KeyNotFoundException, () => new KeyNotFoundException('asdf'));
test(KeyAlreadyDefinedException, () => new KeyAlreadyDefinedException('asdf'));

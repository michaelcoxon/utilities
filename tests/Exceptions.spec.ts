import ArgumentException from '../src/Exceptions/ArgumentException';
import ArgumentNullException from '../src/Exceptions/ArgumentNullException';
import ArgumentUndefinedException from '../src/Exceptions/ArgumentUndefinedException';
import FileNotFoundException from '../src/Exceptions/FileNotFoundException';
import IndexOutOfRangeException from '../src/Exceptions/IndexOutOfRangeException';
import InvalidTypeException from '../src/Exceptions/InvalidTypeException';
import KeyAlreadyDefinedException from '../src/Exceptions/KeyAlreadyDefinedException';
import KeyNotFoundException from '../src/Exceptions/KeyNotFoundException';
import NotImplementedException from '../src/Exceptions/NotImplementedException';
import NotSupportedException from '../src/Exceptions/NotSupportedException';
import OutOfBoundsException from '../src/Exceptions/OutOfBoundsException';
import { ConstructorFor } from '../src/Types';

function test<T>(exceptionType: ConstructorFor<T>, exception: () => T): void
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
                    fail(e);
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

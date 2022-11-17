import ArgumentException from './ArgumentException.js';
import ArgumentNullException from './ArgumentNullException.js';
import ArgumentUndefinedException from './ArgumentUndefinedException.js';
import FileNotFoundException from './FileNotFoundException.js';
import IndexOutOfRangeException from './IndexOutOfRangeException.js';
import InvalidTypeException from './InvalidTypeException.js';
import KeyAlreadyDefinedException from './KeyAlreadyDefinedException.js';
import KeyNotFoundException from './KeyNotFoundException.js';
import NotImplementedException from './NotImplementedException.js';
import NotSupportedException from './NotSupportedException.js';
import OutOfBoundsException from './OutOfBoundsException.js';
import { ConstructorFor } from '../Types.js';

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
                e['message'];
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

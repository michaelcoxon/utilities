import ArgumentException from './ArgumentException';
import ArgumentNullException from './ArgumentNullException';
import ArgumentUndefinedException from './ArgumentUndefinedException';
import FileNotFoundException from './FileNotFoundException';
import IndexOutOfRangeException from './IndexOutOfRangeException';
import InvalidTypeException from './InvalidTypeException';
import KeyAlreadyDefinedException from './KeyAlreadyDefinedException';
import KeyNotFoundException from './KeyNotFoundException';
import NotImplementedException from './NotImplementedException';
import NotSupportedException from './NotSupportedException';
import OutOfBoundsException from './OutOfBoundsException';
import { ConstructorFor } from '../Types';
import AlreadyDisposedException from './AlreadyDisposedException';
import FormatException from './FormatException';
import ErrorException from './ErrorException';
import InvalidOperationException from './InvalidOperationException';
import MutexAlreadyAquiredException from './MutexAlreadyAquiredException';

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

test(AlreadyDisposedException, () => new AlreadyDisposedException('asdf'));
test(ArgumentException, () => new ArgumentException('asdf'));
test(ArgumentNullException, () => new ArgumentNullException('asdf'));
test(ArgumentUndefinedException, () => new ArgumentUndefinedException('asdf'));
test(ErrorException, () => new ErrorException(new Error()));
test(FileNotFoundException, () => new FileNotFoundException('asdf'));
test(FormatException, () => new FormatException('asdf'));
test(IndexOutOfRangeException, () => new IndexOutOfRangeException('asdf', - 1, 0, 1));
test(InvalidOperationException, () => new InvalidOperationException('asdf'));
test(InvalidTypeException, () => new InvalidTypeException('asdf', 'asdf'));
test(KeyNotFoundException, () => new KeyNotFoundException('asdf'));
test(KeyAlreadyDefinedException, () => new KeyAlreadyDefinedException('asdf'));
test(MutexAlreadyAquiredException, () => new MutexAlreadyAquiredException('asdf'));
test(NotImplementedException, () => new NotImplementedException());
test(NotSupportedException, () => new NotSupportedException());
test(InvalidTypeException, () => new InvalidTypeException('asdf', 'asdf'));
test(OutOfBoundsException, () => new OutOfBoundsException('asdf', 0, 1));
test(IndexOutOfRangeException, () => new IndexOutOfRangeException('asdf', -1, 0, 1));

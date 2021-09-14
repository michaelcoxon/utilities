import
{
    ArgumentException,
    ArgumentUndefinedException,
    ArgumentNullException,
    InvalidTypeException,
    NotImplementedException,
    NotSupportedException,
    OutOfBoundsException,
    IndexOutOfRangeException,
    FileNotFoundException,
    KeyNotFoundException,
    KeyAlreadyDefinedException,
    ConstructorFor
} from '../src';

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

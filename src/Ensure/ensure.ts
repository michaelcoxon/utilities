import ArgumentAssertionBuilder, { AssertionType, IArgumentAssertionBuilder } from '../Assertions/ArgumentAssertionBuilder';
import ArrayLikeArgumentAssertionBuilder from '../Assertions/ArrayLikeArgumentAssertionBuilder';
import CompareAssertionBuilder from '../Assertions/CompareAssertionBuilder';
import GuidArgumentAssertionBuilder from '../Assertions/GuidArgumentAssertionBuilder';
import StringArgumentAssertionBuilder from '../Assertions/StringArgumentAssertionBuilder';
import NotSupportedException from '../Exceptions/NotSupportedException';
import Guid from '../Guid';
import isArray from '../TypeHelpers/isArray';
import isComparable from '../TypeHelpers/isComparable';

/**
 * Provides the helpers for validation
 * @param argument The argument.
 * @param argumentName Name of the argument.
 */
export default function ensure(argument: AssertionType<string>, argumentName: string): StringArgumentAssertionBuilder;
export default function ensure(argument: AssertionType<Guid>, argumentName: string): GuidArgumentAssertionBuilder;
export default function ensure<TElement>(argument: AssertionType<ArrayLike<TElement>>, argumentName: string): ArrayLikeArgumentAssertionBuilder<TElement>;
export default function ensure<T>(argument: AssertionType<T>, argumentName: string): ArgumentAssertionBuilder<T>;
export default function ensure(argument: AssertionType<any>, argumentName: string): IArgumentAssertionBuilder<any>
{
    if (argument instanceof Guid)
    {
        return new GuidArgumentAssertionBuilder(argument, argumentName);
    }
    else if (isArray(argument))
    {
        return new ArrayLikeArgumentAssertionBuilder(argument, argumentName);
    }
    else if (typeof (argument) === "string")
    {
        return new StringArgumentAssertionBuilder(argument, argumentName);
    }
    else if (typeof (argument) === "object")
    {
        return new ArgumentAssertionBuilder(argument, argumentName);
    }
    else if (isComparable(argument))
    {
        return new CompareAssertionBuilder(argument, argumentName);
    }
    else
    {
        throw new NotSupportedException("the argument type is not supported");
    }
}

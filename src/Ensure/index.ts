import ArgumentAssertionBuilder, { AssertionType, IArgumentAssertionBuilder } from './Assertions/ArgumentAssertionBuilder.js';
import ArrayLikeArgumentAssertionBuilder from './Assertions/ArrayLikeArgumentAssertionBuilder.js';
import CompareAssertionBuilder from './Assertions/CompareAssertionBuilder.js';
import GuidArgumentAssertionBuilder from './Assertions/GuidArgumentAssertionBuilder.js';
import StringArgumentAssertionBuilder from './Assertions/StringArgumentAssertionBuilder.js';
import NotSupportedException from '../Exceptions/NotSupportedException.js';
import Guid from '../Guid.js';
import isComparable from '../TypeHelpers/isComparable.js';

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
    else if (Array.isArray(argument))
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

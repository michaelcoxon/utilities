import { AssertionType, ArgumentAssertionBuilder, IArgumentAssertionBuilder } from '../ArgumentAssertionBuilder';
import ArrayLikeArgumentAssertionBuilder from '../Assertions/ArrayLikeArgumentAssertionBuilder';
import GuidArgumentAssertionBuilder from '../Assertions/GuidArgumentAssertionBuilder';
import StringArgumentAssertionBuilder from '../Assertions/StringArgumentAssertionBuilder';
import NotSupportedException from '../Exceptions/NotSupportedException';
import Guid from '../Guid';

/**
 * Provides the helpers for validation
 * @param argument The argument.
 * @param argumentName Name of the argument.
 */
export function arg(argument: AssertionType<string>, argumentName: string): StringArgumentAssertionBuilder;
export function arg(argument: AssertionType<Guid>, argumentName: string): GuidArgumentAssertionBuilder;
export function arg<TElement>(argument: AssertionType<ArrayLike<TElement>>, argumentName: string): ArrayLikeArgumentAssertionBuilder<TElement>;
export function arg<T>(argument: AssertionType<T>, argumentName: string): ArgumentAssertionBuilder<T>;
export function arg(argument: AssertionType<any>, argumentName: string): IArgumentAssertionBuilder<any>
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
    else
    {
        throw new NotSupportedException("the argument type is not supported");
    }
}

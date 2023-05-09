import ArgumentAssertionBuilder, { IArgumentAssertionBuilder } from './ArgumentAssertionBuilder';
import ArgumentException from '../Exceptions/ArgumentException';
import ArgumentNullException from '../Exceptions/ArgumentNullException';
import ArgumentUndefinedException from '../Exceptions/ArgumentUndefinedException';
import { empty } from '../Strings/_consts';
import DefaultComparers from '../Comparers/DefaultComparers';
import { IComparable } from '../Comparers/_types';


export default class StringArgumentAssertionBuilder
    extends ArgumentAssertionBuilder<string>
    implements IArgumentAssertionBuilder<string>
{
    /**
    * Ensures the string is not null, undefined or empty
    * @throws {ArgumentNullException}
    * @throws {ArgumentUndefinedException}
    * @throws {ArgumentException}
    */
    isNotNullOrUndefinedOrEmpty(): this
    {
        if (this.argument === null)
        {
            throw new ArgumentNullException(this.argumentName);
        }
        if (this.argument === undefined)
        {
            throw new ArgumentUndefinedException(this.argumentName);
        }
        if (this.argument === empty)
        {
            throw new ArgumentException(this.argumentName);
        }
        return this;
    }

    /**
    * Ensures the string is not empty
    * @throws {ArgumentException}
    */
    isNotEmpty(): this
    {
        if (this.argument.length == 0)
        {
            throw new ArgumentException(this.argumentName);
        }
        return this;
    }

    /**
     * Ensures the string matches the specified regex.
     *  @param {RegExp} regex The regex.
     *  @throws {ArgumentException}
     */
    matchesRegex(regex: RegExp): this
    {
        if (!regex.test(this.argument))
        {
            throw new ArgumentException(this.argumentName, `The string '${this.argument}' does not match the regular expression '${regex}'`);
        }

        return this;
    }


    /**
     *  Ensures the string is greater than or equal to the specified value.
     *  @param {T} value The value.
     *  @throws {ArgumentException}
     */
    isGreaterThanOrEqualTo<T extends IComparable>(value: T): this
    {
        if (DefaultComparers.DefaultComparer.compare(this.argument.valueOf(), value) < 0)
        {
            throw new ArgumentException(`The argument '${this.argumentName}' is not greater than or equal to '${value}'`, this.argumentName);
        }
        return this;
    }

    /**
     *  Ensures the string is less than or equal to the specified value.
     *  @param value The value.
     *  <exception cref="System.ArgumentNullException"></exception>
     */
    isLessThanOrEqualTo<T extends IComparable>(value: T): this
    {
        if (DefaultComparers.DefaultComparer.compare(this.argument.valueOf(), value) > 0)
        {
            throw new ArgumentException(`The argument '${this.argumentName}' is not less than or equal to '${value}'`, this.argumentName);
        }
        return this;
    }

    /**
     *  Ensures the string is less than the specified value.
     *  @param {T} value The value.
     *  @throws {ArgumentException}
     */
    isLessThan<T extends IComparable>(value: T): this
    {
        if (DefaultComparers.DefaultComparer.compare(this.argument.valueOf(), value) != -1)
        {
            throw new ArgumentException(`The argument '${this.argumentName}' is not less '${value}'`, this.argumentName);
        }
        return this;
    }

    /**
     *  Ensures the string is greater than the specified value.
     *  @param {T} value The value.
     *  @throws {ArgumentException}
     */
    isGreaterThan<T extends IComparable>(value: T): this
    {
        if (DefaultComparers.DefaultComparer.compare(this.argument.valueOf(), value) != 1)
        {
            throw new ArgumentException(`The argument '${this.argumentName}' is not greater than '${value}'`, this.argumentName);
        }
        return this;
    }

    /**
     *  Ensures the string is equal to the specified value.
     *  @param {T} value The value.
     *  @throws {ArgumentException}
     */
    isEqualTo<T extends IComparable>(value: T): this
    {
        if (DefaultComparers.DefaultComparer.compare(this.argument.valueOf(), value) != 0)
        {
            throw new ArgumentException(`The argument '${this.argumentName}' is not equal to '${value}'`, this.argumentName);
        }
        return this;
    }
}

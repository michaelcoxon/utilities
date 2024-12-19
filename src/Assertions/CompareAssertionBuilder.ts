import ArgumentAssertionBuilder from './ArgumentAssertionBuilder';
import { IComparable } from '../Comparers/_types';
import ArgumentException from '../Exceptions/ArgumentException';
import DefaultComparers from '../Comparers/DefaultComparers';
import { format } from '../Strings';
import SR from '../i18n/en/assertions.strings';

export default class CompareAssertionBuilder<T extends IComparable> extends ArgumentAssertionBuilder<T>
{
    /// <summary>
    /// Ensures the argument is greater than or equal to the specified value.
    /// </summary>
    /// <param name="this">The this.</param>
    /// <param name="value">The value.</param>
    /// <exception cref="System.ArgumentNullException"></exception>
    isGreaterThanOrEqualTo<T extends IComparable>(value: T): this
    {
        if (DefaultComparers.DefaultComparer.compare(this.argument.valueOf(), value) < 0)
        {
            throw new ArgumentException(format(SR.isGreaterThanOrEqualToExceptionMessage, this.argumentName, value), this.argumentName);
        }
        return this;
    }

    /// <summary>
    /// Ensures the argument is less than or equal to the specified value.
    /// </summary>
    /// <param name="this">The this.</param>
    /// <param name="value">The value.</param>
    /// <exception cref="System.ArgumentNullException"></exception>
    isLessThanOrEqualTo<T extends IComparable>(value: T): this
    {
        if (DefaultComparers.DefaultComparer.compare(this.argument.valueOf(), value) > 0)
        {
            throw new ArgumentException(format(SR.isLessThanOrEqualToExceptionMessage, this.argumentName, value), this.argumentName);
        }
        return this;
    }

    /// <summary>
    /// Ensures the argument is less than the specified value.
    /// </summary>
    /// <param name="this">The this.</param>
    /// <param name="value">The value.</param>
    /// <exception cref="System.ArgumentNullException"></exception>
    isLessThan<T extends IComparable>(value: T): this
    {
        if (DefaultComparers.DefaultComparer.compare(this.argument.valueOf(), value) != -1)
        {
            throw new ArgumentException(format(SR.isLessThanExceptionMessage, this.argumentName, value), this.argumentName);
        }
        return this;
    }

    /// <summary>
    /// Ensures the argument is greater than the specified value.
    /// </summary>
    /// <param name="this">The this.</param>
    /// <param name="value">The value.</param>
    /// <exception cref="System.ArgumentNullException"></exception>
    isGreaterThan<T extends IComparable>(value: T): this
    {
        if (DefaultComparers.DefaultComparer.compare(this.argument.valueOf(), value) != 1)
        {
            throw new ArgumentException(format(SR.isGreaterThanExcepetionMessage, this.argumentName, value), this.argumentName);
        }
        return this;
    }

    /// <summary>
    /// Ensures the argument is equal to the specified value.
    /// </summary>
    /// <param name="this">The this.</param>
    /// <param name="value">The value.</param>
    /// <exception cref="System.ArgumentNullException"></exception>
    isEqualTo<T extends IComparable>(value: T): this
    {
        if (DefaultComparers.DefaultComparer.compare(this.argument.valueOf(), value) != 0)
        {
            throw new ArgumentException(format(SR.isEqualToExceptionMessage, this.argumentName, value), this.argumentName);
        }
        return this;
    }
}

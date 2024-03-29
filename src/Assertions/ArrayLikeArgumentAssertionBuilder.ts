﻿import ArgumentAssertionBuilder from './ArgumentAssertionBuilder';
import ArgumentException from '../Exceptions/ArgumentException';

export default class ArrayLikeArgumentAssertionBuilder<T> extends ArgumentAssertionBuilder<ArrayLike<T>>
{
    /** Ensures the array is not null, undefined or empty */
    isNotNullOrUndefinedOrEmpty(): this
    {
        return this.isNotNullOrUndefined().isNotEmpty();
    }

    /** Ensures the array is not empty */
    isNotEmpty(): this
    {
        if (this.argument.length == 0)
        {
            throw new ArgumentException(this.argumentName);
        }
        return this;
    }
}

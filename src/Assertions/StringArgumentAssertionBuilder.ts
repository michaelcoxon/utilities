import { ArgumentAssertionBuilder, IArgumentAssertionBuilder } from './ArgumentAssertionBuilder';
import ArgumentException from '../Exceptions/ArgumentException';
import ArgumentNullException from '../Exceptions/ArgumentNullException';
import ArgumentUndefinedException from '../Exceptions/ArgumentUndefinedException';
import { empty } from '../Strings/_consts';


export default class StringArgumentAssertionBuilder
    extends ArgumentAssertionBuilder<string>
    implements IArgumentAssertionBuilder<string>
{
    /** Ensures the string is not null, undefined or empty */
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
     * Ensures the argument matches the specified regex.
     * @param regex The regex.
     */
    matchesRegex(regex: RegExp): this
    {
        if (!regex.test(this.argument))
        {
            throw new ArgumentException(this.argumentName, `The string '${this.argument}' does not match the regular expression '${regex}'`);
        }

        return this;
    }
}

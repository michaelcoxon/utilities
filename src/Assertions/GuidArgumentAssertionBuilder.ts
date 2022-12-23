import ArgumentAssertionBuilder from './ArgumentAssertionBuilder';
import ArgumentException from '../Exceptions/ArgumentException';
import Guid from '../Guid';
import SR from '../i18n/en.assertions.strings.json';
import { format } from '../Strings';


export default class GuidArgumentAssertionBuilder extends ArgumentAssertionBuilder<Guid>
{
    /// <summary>
    /// Ensures the <see cref="Guid" /> argument is not equal to <see cref="Guid.Empty" />.
    /// </summary>
    /// <param name="this">The this.</param>
    /// <exception cref="System.ArgumentException"></exception>
    isValidGuid(): this
    {
        if (this.argument == Guid.empty)
        {
            throw new ArgumentException(this.argumentName);
        }        
        return this;
    }

    /**
     * Determines whether the argument is one of the specified options.
     * @param options
     */
    isOneOf(...options: Guid[]): this
    {
        let matched = false;

        for (let option of options)
        {
            matched = option.toString() === this.argument.toString();

            if (matched)
            {
                break;
            }
        }

        if (!matched)
        {
            throw new ArgumentException(this.argumentName, format(SR.isOneOfExceptionMessage, this.argumentName, options.join("', '")));
        }

        return this;
    }
}

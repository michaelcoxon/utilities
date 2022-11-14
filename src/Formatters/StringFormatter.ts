import FormatException from '../Exceptions/FormatException.js';
import isNullOrEmpty from '../TypeHelpers/isNullOrEmpty.js';
import { IFormatter } from './_types.js';

/** Formats strings */

export default class StringFormatter implements IFormatter<string>
{
    public format(subject: string, format?: string): string
    {
        if (isNullOrEmpty(format))
        {
            return subject;
        }

        else
        {
            switch (format)
            {
                case 'L': return subject.toLowerCase();
                case 'U': return subject.toUpperCase();

                default: throw new FormatException(`The format '${format}' is not implemented`);
            }
        }
    }
}

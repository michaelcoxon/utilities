import FormatException from '../Exceptions/FormatException';
import Strings from '../Strings';
import { IFormatter } from './_types';

/** Formats strings */

export default  class StringFormatter implements IFormatter<string>
{
    public format(subject: string, format: string): string
    {
        if (Strings.isNullOrEmpty(format))
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

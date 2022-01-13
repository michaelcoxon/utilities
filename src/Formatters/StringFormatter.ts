import FormatException from '../Exceptions/FormatException';
import isNullOrEmpty from '../TypeHelpers/isNullOrEmpty';
import { IFormatter } from './_types';

const StringFormats = {
    UPPERCASE: 'U',
    LOWERCASE: 'L'
};

/** Formats strings */
export default class StringFormatter implements IFormatter<string>
{
    public format(subject: string, format: string): string
    {
        if (isNullOrEmpty(format))
        {
            return subject;
        }

        else
        {
            switch (format)
            {
                case StringFormats.LOWERCASE: return subject.toLowerCase();
                case StringFormats.UPPERCASE: return subject.toUpperCase();

                default: throw new FormatException(`The format '${format}' is not implemented`);
            }
        }
    }
}

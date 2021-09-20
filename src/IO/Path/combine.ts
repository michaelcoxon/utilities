import ArgumentException from "../../Exceptions/ArgumentException";
import trim from '../../Strings/trim';
import trimEnd from '../../Strings/trimEnd';

/**
 * Combines path segments into a path. Auto-senses 'slash' direction.
 * @param args
 */



export default function combine(...args: string[]): string
{
    if (args.length == 0)
    {
        throw new ArgumentException("path", "Provide at least 1 path to combine");
    }

    const segments = args.map((arg, i) =>
    {
        if (i == 0)
        {
            return trimEnd(arg, '/\\');
        }

        else
        {
            return trim(arg, '/\\');
        }
    });

    if (args.findIndex(i => i.indexOf('\\') > -1) > -1)
    {
        return segments.join('\\');
    }

    return segments.join('/');
}
